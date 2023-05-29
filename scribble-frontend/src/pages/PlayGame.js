import React, { useEffect, useState } from "react";
import AllPlayers from "../components/AllPlayers";
import Canvas from "../components/Canvas";
import CanvasTools from "../components/CanvasTools";
import Chat from "../components/Chat";
import Timer from "../components/Timer";
import Word from "../components/Word";
import { useDispatch, useSelector } from "react-redux";
import { changeGameState, updateScoreboard } from "../store/RoomStore";
import Scorebaord from "../components/Scorebaord";

export default function PlayGame() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.PlayerStore);
  const [displayScoreboard, setDisplayScoreboard] = useState(false);

  useEffect(() => {
    const roundEnd = (finalScoreboard) => {
      dispatch(updateScoreboard(finalScoreboard));
      setDisplayScoreboard(true);
    };

    socket.on("session/end", roundEnd);
  }, [socket, dispatch]);

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
      {displayScoreboard && <Scorebaord />}
    </div>
  );
}
