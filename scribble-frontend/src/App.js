import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket } from "./store/PlayerStore";
import { changeGameState } from "./store/RoomStore";
import Connecting from "./pages/Connecting";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import PlayGame from "./pages/PlayGame";
import Scorebaord from "./pages/Scorebaord";

function App() {
  const { gameState } = useSelector((state) => state.RoomStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io("http://localhost:5050");
    dispatch(connectSocket(newSocket));
    dispatch(changeGameState("home"));
    return () => newSocket.close();
  }, [dispatch]);

  return (
    <div className="App">
      {gameState === "connecting" && <Connecting />}
      {gameState === "home" && <Home />}
      {gameState === "lobby" && <Lobby />}
      {gameState === "start" && <PlayGame />}
      {gameState === "finished" && <Scorebaord />}
    </div>
  );
}

export default App;
