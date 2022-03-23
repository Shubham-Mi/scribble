const uuidv4 = require("uuid").v4;
const { RoomIdGenerator } = require("./services/RoomServices");

const messages = new Set();
const users = new Map();

const defaultUser = {
  name: "user",
  avatar: "avatar1",
};

const messageExpirationTimeMS = 10 * 60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

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
    this.socket.join(id);
    users.set(this.socket, { name: userName, avatar: userAvatar });
    console.log(`Room created with room id ${id}`);
    console.log(`Player ${this.socket.id} joined room ${id}`);
    setRoomIdFunction(id);
  }

  joinRoom(room, userName, userAvatar, setRoomIdFunction) {
    this.socket.join(room);
    users.set(this.socket, { name: userName, avatar: userAvatar });
    console.log(`Player ${this.socket.id} joined room ${room}`);
    setRoomIdFunction(room);
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
