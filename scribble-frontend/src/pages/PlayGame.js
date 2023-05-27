import React, { useEffect } from "react";
import AllPlayers from "../components/AllPlayers";
import Canvas from "../components/Canvas";
import CanvasTools from "../components/CanvasTools";
import Chat from "../components/Chat";
import Timer from "../components/Timer";
import Word from "../components/Word";
import { useDispatch, useSelector } from "react-redux";
import { changeGameState, updateScoreboard } from "../store/RoomStore";

export default function PlayGame() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.PlayerStore);

  useEffect(() => {
    const roundEnd = (finalScoreboard) => {
      console.log(finalScoreboard);
      dispatch(updateScoreboard(finalScoreboard));
      dispatch(changeGameState("finished"));
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
    </div>
  );
}
