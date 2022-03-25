const uuidv4 = require("uuid").v4;
const { RoomIdGenerator } = require("./services/RoomServices");

const messages = new Set();
const users = new Map();
var rooms = {};

function addUserToRoom(room, user) {
  rooms[room] = rooms[room] || [];
  rooms[room].push(user);
}

function removeUserFromRoom(room, user) {
  rooms[room] = rooms[room] || [];

  for (let i = 0; i < rooms[room].length; i++) {
    if (rooms[room][i].id === user.id) {
      rooms[room].splice(i, 1);
      i--;
    }
  }

  if (rooms[room].length === 0) {
    delete rooms[room];
  }
}

const defaultUser = {
  id: -1,
  name: "user",
  avatar: "avatar1",
  score: 0,
};

const messageExpirationTimeMS = 10 * 60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.room = "";

    socket.on("create-room", (name, avatar, func) =>
      this.createRoom(name, avatar, func)
    );
    socket.on("join-room", (room, name, avatar, func) =>
      this.joinRoom(room, name, avatar, func)
    );
    socket.on("disconnect", () => this.disconnect());
    socket.on("message", (value, room) => this.handleMessage(value, room));
    socket.on("canvas-draw", (commands, room) =>
      this.drawOnCanvas(commands, room)
    );
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  createRoom(userName, userAvatar, setRoomIdFunction) {
    const id = RoomIdGenerator();
    this.room = id;
    this.socket.join(id);
    users.set(this.socket, {
      id: this.socket.id,
      name: userName,
      avatar: userAvatar,
      score: 0,
    });
    addUserToRoom(this.room, users.get(this.socket));
    setRoomIdFunction(id);
    this.io.to(this.room).emit("player-joined", rooms[this.room]);
  }

  joinRoom(room, userName, userAvatar, setRoomIdFunction) {
    this.room = room;
    this.socket.join(room);
    users.set(this.socket, {
      id: this.socket.id,
      name: userName,
      avatar: userAvatar,
      score: 0,
    });
    setRoomIdFunction(room);
    addUserToRoom(this.room, users.get(this.socket));
    this.io.to(this.room).emit("player-joined", rooms[this.room]);
  }

  handleMessage(value, room) {
    const message = {
      id: uuidv4(),
      user: users.get(this.socket) || defaultUser,
      value,
      time: Date.now(),
      room: room,
    };

    messages.add(message);
    this.io.to(room).emit("message", message);

    setTimeout(() => {
      messages.delete(message);
      this.io.sockets.emit("deleteMessage", message.id);
    }, messageExpirationTimeMS);
  }

  disconnect() {
    removeUserFromRoom(this.room, users.get(this.socket));
    this.io.to(this.room).emit("player-left", users.get(this.socket));
    users.delete(this.socket);
  }

  drawOnCanvas(commands, room) {
    this.socket.broadcast.to(room).emit("canvas-draw", commands);
  }
}

function socketConnection(io) {
  io.on("connection", (socket) => {
    new Connection(io, socket);
  });
}

module.exports = socketConnection;
