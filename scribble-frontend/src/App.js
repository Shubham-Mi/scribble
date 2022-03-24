import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket } from "./store/PlayerStore";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";

function App() {
  const { gameState } = useSelector((state) => state.RoomStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    dispatch(connectSocket(newSocket));
    return () => newSocket.close();
  }, [dispatch]);

  return (
    <div className="App">
      {gameState === "none" && <Home />}
      {gameState === "lobby" && <Lobby />}
    </div>
  );
}

export default App;
