import React from "react";
import AllPlayers from "../components/AllPlayers";
import Canvas from "../components/Canvas";
import CanvasTools from "../components/CanvasTools";
import Chat from "../components/Chat";

export default function PlayGame() {
  return (
    <div className="play-area">
      <CanvasTools />
      <Canvas />
      <div className="right__component">
        <div className="guess__word">
          <span>Word</span>
          <span>Timer</span>
        </div>
        <Chat />
      </div>
      <AllPlayers />
    </div>
  );
}
