const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

const users = {};

io.on("connection", (socket) => {

  socket.on("join", (username) => {
    socket.username = username;
    users[socket.id] = username;

    io.emit("userList", Object.values(users));
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

  socket.on("disconnect", () => {
    if (socket.username) {
      delete users[socket.id];

      io.emit("userList", Object.values(users));
      io.emit("message", {
        user: "System",
        text: `${socket.username} left the chat`
      });
    }
  });

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
