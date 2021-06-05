const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const firstUppercaseText = require("./utils");

const app = express();

const server = http.createServer(app);

// Socket Instance
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors);

// Route
app.use(router);

io.on("connection", (socket) => {
  console.log("New Connection");

  // Listen from client
  // Callback: handle error
  socket.on("join", ({ name, room }, callback) => {
    // Add user
    const { error, user, users } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    // No error, send message of welcoming
    socket.emit("message", {
      user: "admin",
      text: `${firstUppercaseText(
        user.name
      )}, welcome to the room ${firstUppercaseText(user.room)}`,
    });

    // broadcast: send message to all users except you
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${firstUppercaseText(user.name)} has joined!`,
    });

    // If user exist, join room
    socket.join(user.room);

    // All users
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // listen to message from frontend
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    // send back the message to room
    io.to(user.room).emit("message", { user: user.name, text: message });
    // send back the message to all users in room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    // Refresh page from frontend -> get welcome again
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${firstUppercaseText(user.name)} has left.`,
      });
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
