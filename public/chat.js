const socket = io();
const username = localStorage.getItem("username");

if (!username) {
  window.location.href = "index.html";
}

socket.emit("join", username);

const messagesDiv = document.getElementById("messages");
const usersList = document.getElementById("users");
const typingDiv = document.getElementById("typing");
const msgInput = document.getElementById("msg");

socket.on("message", (data) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on("userList", (users) => {
  usersList.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.innerHTML = `🟢 ${user}`;
    usersList.appendChild(li);
  });
});

function send() {
  const msg = msgInput.value.trim();
  if (msg) {
    socket.emit("sendMessage", msg);
    msgInput.value = "";
    socket.emit("stopTyping");
  }
}

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
