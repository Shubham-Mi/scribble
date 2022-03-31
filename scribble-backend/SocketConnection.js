const {
  join,
  create,
  chat,
  disconnect,
  startGame,
  draw,
} = require("./handlers/gameSession");
const Player = require("./models/player");

class Connection {
  constructor(socket) {
    this.socket = socket;
    const player = new Player(socket);

    socket.on("session/create", (name, avatar, func) =>
      create(player, name, avatar, func)
    );

    socket.on("session/join", (room, name, avatar, func) =>
      join(room, player, name, avatar, func)
    );

    socket.on("disconnect", () => disconnect(player));

    socket.on("session/start", (rounds, timer) =>
      startGame(player, rounds, timer)
    );

    socket.on("session/chat", (message) => chat(player, message));

    socket.on("round/draw", (commands) => draw(player, commands));

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
}

function socketConnection(io) {
  io.on("connection", (socket) => {
    new Connection(socket);
  });
}

module.exports = socketConnection;
