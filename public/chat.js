const socket = io();

const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

if (!username) {
  window.location.href = "index.html";
}

// Send username + password to server
socket.emit("join", { username, password });

const messagesDiv = document.getElementById("messages");
const usersList = document.getElementById("users");
const typingDiv = document.getElementById("typing");
const msgInput = document.getElementById("msg");

let isAdmin = username.toLowerCase() === "admin";

// Auth error (wrong admin password)
socket.on("authError", (msg) => {
  alert(msg);
  localStorage.clear();
  window.location.href = "index.html";
});

// Messages
socket.on("message", (data) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Online users + admin remove
socket.on("userList", (users) => {
  usersList.innerHTML = "";

  Object.entries(users).forEach(([id, user]) => {
    const li = document.createElement("li");
    li.innerHTML = `🟢 ${user.username}`;

    if (isAdmin && user.role !== "admin") {
      const btn = document.createElement("button");
      btn.innerText = "❌";
      btn.style.marginLeft = "10px";
      btn.onclick = () => socket.emit("removeUser", id);
      li.appendChild(btn);
    }

    usersList.appendChild(li);
  });
});

// Send message
function send() {
  const msg = msgInput.value.trim();
  if (msg) {
    socket.emit("sendMessage", msg);
    msgInput.value = "";
    socket.emit("stopTyping");
  }
}

// Typing indicator
let typingTimer;
msgInput.addEventListener("input", () => {
  socket.emit("typing");
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    socket.emit("stopTyping");
  }, 1000);
});

socket.on("typing", (text) => {
  typingDiv.innerText = text;
});

// Removed by admin
socket.on("removed", () => {
  alert("You were removed by admin");
  localStorage.clear();
  window.location.href = "index.html";
});
