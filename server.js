const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// 🔐 ADMIN PASSWORD (change this)
const ADMIN_PASSWORD = "admin123";

app.use(express.static("public"));

/*
users = {
  socketId: { username, role }
}
*/
const users = {};

io.on("connection", (socket) => {

  socket.on("join", ({ username, password }) => {

    // 🔐 Admin authentication
    if (username.toLowerCase() === "admin") {
      if (password !== ADMIN_PASSWORD) {
        socket.emit("authError", "Invalid admin password");
        return;
      }
    }

    const role = username.toLowerCase() === "admin" ? "admin" : "user";

    users[socket.id] = { username, role };
    socket.username = username;
    socket.role = role;

    io.emit("userList", users);

    io.emit("message", {
      user: "System",
      text: `${username} joined the chat`
    });
  });

  socket.on("sendMessage", (msg) => {
    io.emit("message", {
      user: socket.username,
      text: msg
    });
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing", `${socket.username} is typing...`);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("typing", "");
  });

  // 🔥 ADMIN REMOVES USER
  socket.on("removeUser", (targetSocketId) => {
    if (socket.role !== "admin") return;

    const targetUser = users[targetSocketId];
    if (targetUser) {
      io.to(targetSocketId).emit("removed");
      io.sockets.sockets.get(targetSocketId)?.disconnect(true);

      delete users[targetSocketId];

      io.emit("userList", users);
      io.emit("message", {
        user: "System",
        text: `${targetUser.username} was removed by admin`
      });
    }
  });

  socket.on("disconnect", () => {
    if (users[socket.id]) {
      const name = users[socket.id].username;
      delete users[socket.id];

      io.emit("userList", users);
      io.emit("message", {
        user: "System",
        text: `${name} left the chat`
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
