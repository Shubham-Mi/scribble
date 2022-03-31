import React from "react";
import AllPlayers from "../components/AllPlayers";
import Canvas from "../components/Canvas";
import CanvasTools from "../components/CanvasTools";
import Chat from "../components/Chat";
import Timer from "../components/Timer";
import Word from "../components/Word";

export default function PlayGame() {
  return (
    <div className="play-area">
      <CanvasTools />
      <Canvas />
      <div className="right__component">
        <div className="guess__word">
          <Word />
          <Timer />
        </div>
        <Chat />
      </div>
      <AllPlayers />
    </div>
  );
}
