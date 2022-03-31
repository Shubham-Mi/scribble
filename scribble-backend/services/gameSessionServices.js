const SEC_TO_MS = 1000;
const BUFFER_TIME = 5000;

class GameSessionServies {
  constructor(session) {
    this._session = session;
  }

  joinSession(player) {
    this._session.addPlayer(player);
    this.syncRoomState();

    const allPlayers = {};
    this._session.players.forEach((player) => {
      allPlayers[player.playerId] = player.playerData;
    });

    player.socket
      .to(this._session.sessionId)
      .emit("session/player/join", allPlayers);
    player.socket.emit("session/player/join", allPlayers);
  }

  leaveSession(player) {
    const playersLeft = this._session.removePlayer(player);
    this.syncRoomState();

    player.socket
      .to(this._session.sessionId)
      .emit("session/player/left", player.playerData);
    player.socket.emit("session/player/left", player.playerData);

    return playersLeft;
  }

  setRoomSettings(rounds, timer) {
    this._session.setTotalRounds(this._session.players.length * rounds);
    this._session.setTimer(timer);
    this.syncRoomState();
  }

  startSessionRound(player) {
    if (this._session.playedRounds >= this._session.totalRounds) {
      player.socket.to(this._session.sessionId).emit("session/end");
      player.socket.emit("session/end");
    }

    if (this._session.roundStart()) {
      player.socket.to(this._session.sessionId).emit("game/start");
      player.socket.emit("game/start");
      this.sendTheWordToTheDrawer();

      setTimeout(() => {
        this.revealTheWord(player);
        this._session.roundEnd();
        this.syncRoomState();
      }, this._session.Timer * SEC_TO_MS);

      setTimeout(() => {
        this.startSessionRound(player);
      }, BUFFER_TIME);
    }
  }

  sendTheWordToTheDrawer() {
    this._session.drawer.socket.emit(
      "round/word/draw",
      this._session.currentWord
    );
  }

  revealTheWord(player) {
    player.socket
      .to(this._session.sessionId)
      .emit("round/word/reveal", this._session.currentWord);
    player.socket.emit("round/word/reveal", allPlayerthis._session.currentWord);
  }

  playerGuess(player, word) {
    if (this._session.guessWord(player, word)) {
      player.socket
        .to(this._session.sessionId)
        .emit("round/guess", player, word, true);
      player.socket.emit("round/guess", player, word, true);
      this.syncRoomState();
    } else {
      player.socket
        .to(this._session.sessionId)
        .emit("round/guess", player, word, false);
      player.socket.emit("round/guess", player, word, false);
    }
  }

  syncRoomState() {
    // TODO sync Room state
  }
}

module.exports = GameSessionServies;
