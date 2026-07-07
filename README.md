# 💬 HeHe - Real-Time Chat Application

A modern real-time web chat application built using **Node.js**, **Express.js**, and **Socket.IO**. HeHe enables instant messaging between multiple users with a clean interface, online user tracking, typing indicators, and role-based admin controls.

---

## 🚀 Features

- ⚡ Real-time messaging using Socket.IO
- 👥 Multiple users can join the same chat room
- 🟢 Online/Offline user status
- ✍️ Typing indicator
- 👨‍💼 Admin authentication
- 🚫 Admin can remove users
- 📢 Join and leave notifications
- 📱 Responsive and user-friendly interface

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- Socket.IO

---

## 📂 Project Structure

```
HeHe-Chat/
│── public/
│   ├── css/
│   ├── js/
│   └── images/
│
│── server/
│   ├── utils/
│   └── server.js
│
│── package.json
│── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/HeHe-Chat.git
```

### Navigate into the project

```bash
cd HeHe-Chat
```

### Install dependencies

```bash
npm install
```

### Start the server

```bash
npm start
```

or

```bash
node server.js
```

Open your browser and visit:

```
https://hehe-wbhi.onrender.com/
```

---

## 📸 Screenshots

### Login Page



<img width="557" height="419" alt="image" src="https://github.com/user-attachments/assets/15b7a11d-e88c-4fb0-be90-01e65eb60d0c" />

### Chat Interface



<img width="539" height="529" alt="image" src="https://github.com/user-attachments/assets/83c33aca-99d9-47cd-ad20-bee00f436796" />


## 🏗️ System Architecture

```
Client (Browser)
        │
        │ WebSocket (Socket.IO)
        ▼
Node.js + Express Server
        │
        ▼
Authentication & User Management
```

---

## 🔄 Workflow

1. User enters username.
2. Server authenticates user.
3. Socket connection is established.
4. Messages are broadcast instantly.
5. Online users are updated.
6. Admin can remove users if required.

---

## 📌 Modules

- Login Module
- Chat Module
- Notification Module
- Admin Module

---

## 🎯 Objectives

- Learn real-time communication using WebSockets.
- Build a full-stack web application.
- Implement role-based authentication.
- Improve understanding of event-driven programming.

---

## 📈 Future Improvements

- Database integration (MongoDB)
- End-to-end encryption
- Private messaging
- File sharing
- Emoji support
- Voice and video calling
- Multiple chat rooms
- Mobile application

---

## ⚠️ Limitations

- Single chat room
- No persistent chat history
- No end-to-end encryption
- Text messages only
- Performance may reduce with a very large number of users

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Ansh**

B.Tech CSE Student

---

⭐ If you found this project useful, don't forget to **Star** the repository!
