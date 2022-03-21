const uuidv4 = require("uuid").v4;
const RoomIdGenerator = require("./RoomIdGenerator");

const messages = new Set();
const users = new Map();

const defaultUser = {
  id: "user",
  name: "user",
};

const messageExpirationTimeMS = 5 * 60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("create-room", (func) => this.createRoom(func));
    socket.on("join-room", (room, func) => this.joinRoom(room, func));
    socket.on("message", (value, room) => this.handleMessage(value, room));
    socket.on("disconnect", () => this.disconnect());
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  createRoom(setRoomIdFunction) {
    const id = RoomIdGenerator();
    this.socket.join(id);
    console.log(`Room created with room id ${id}`);
    console.log(`Player ${this.socket.id} joined room ${id}`);
    setRoomIdFunction(id);
  }

  joinRoom(room, setRoomIdFunction) {
    this.socket.join(room);
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
}

function socketConnection(io) {
  io.on("connection", (socket) => {
    new Connection(io, socket);
  });
}

module.exports = socketConnection;
