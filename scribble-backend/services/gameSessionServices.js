const SEC_TO_MS = 1000;

class GameSessionServies {
  constructor(session) {
    this._session = session;
  }

  joinSession(player) {
    this._session.addPlayer(player);

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

    player.socket
      .to(this._session.sessionId)
      .emit("session/player/left", player.playerData);
    player.socket.emit("session/player/left", player.playerData);

    return playersLeft;
  }

  setRoomSettings(rounds, timer) {
    this._session.setTotalRounds(this._session.players.length * rounds);
    this._session.setTimer(timer);
  }

  startSessionRound(player) {
    if (this._session.playedRounds >= this._session.totalRounds) {
      player.socket.to(this._session.sessionId).emit("session/end");
      const scoreboard = this._session.scoreboard;
      const allPlayers = this._session.players;
      var finalScoreboard = {};
      for (let i = 0; i < allPlayers.length; ++i) {
        finalScoreboard[allPlayers[i].playerData["name"]] =
          scoreboard[allPlayers[i].playerData["id"]].points;
      }
      console.log(finalScoreboard);
      player.socket
        .to(this._session.sessionId)
        .emit("session/end", finalScoreboard);
      player.socket.emit("session/end", finalScoreboard);
      return;
    }

    if (this._session.roundStart()) {
      player.socket
        .to(this._session.sessionId)
        .emit("game/start", this._session.timer);
      player.socket.emit("game/start", this._session.timer);
      this.sendGuessingWord();

      setTimeout(() => {
        this.revealTheWord(player);
        this._session.roundEnd();
        player.socket.to(this._session.sessionId).emit("round/end");
        player.socket.emit("round/end");
      }, this._session.timer * SEC_TO_MS);

      setTimeout(() => {
        this.startSessionRound(player);
      }, (this._session.timer + 5) * SEC_TO_MS);
    }
  }

  sendGuessingWord() {
    this._session.drawer.socket
      .to(this._session.sessionId)
      .emit("round/word/guess", this._session.currentWord.length);

    this._session.drawer.socket.emit(
      "round/word/draw",
      this._session.currentWord
    );
  }

  revealTheWord(player) {
    player.socket
      .to(this._session.sessionId)
      .emit("round/word/reveal", this._session.currentWord);
    player.socket.emit("round/word/reveal", this._session.currentWord);
  }

  playerGuess(player, word) {
    let guessed = false;
    if (this._session.guessWord(player, word)) {
      guessed = true;
    }
    const message = {
      username: player.playerData["name"],
      value: guessed === true ? "" : word,
      validity: guessed,
    };
    player.socket.to(this._session.sessionId).emit("round/guess", message);
    player.socket.emit("round/guess", message);
  }
}

module.exports = GameSessionServies;
