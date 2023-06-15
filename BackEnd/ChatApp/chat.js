const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
require("dotenv").config()

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("One user has joined");

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    socket.emit(
      "message",
      formateMessage("Welcome", "Welcome")
    );
    socket.emit("roomname", room);

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formateMessage("Welcome", `${username} has joined the chat`)
      );

    io.to(user.room).emit("allusers", getRoomUsers(room));
  });

  socket.on("chatmessage", (msg) => {
    console.log(msg);

    const user = getCurrentUser(socket.id);

    console.log(user.room);
    io.to(user.room).emit("message", formateMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    console.log("one user left");


    io.to(user.room).emit(
      "message",
      formateMessage("Welcome", `${user.username} has left the chat`)
    );

    io.to(user.room).emit("allusers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });

  });
});

const PORT = process.env.PORT || 8013;

server.listen(PORT, () => {
  console.log("server is running on port" + PORT);
});
