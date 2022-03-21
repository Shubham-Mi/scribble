import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinGame, changeGameState } from "../store/GameStore";

export default function Home() {
  const { socket } = useSelector((state) => state.GameStore);
  const dispatch = useDispatch();
  const joinRoomId = useRef(null);

  function createRoom() {
    socket.emit("create-room", (id) => {
      dispatch(changeGameState("lobby"));
      dispatch(joinGame(id));
    });
  }

  function joinRoom() {
    socket.emit("join-room", joinRoomId.current.value, (id) => {
      dispatch(changeGameState("lobby"));
      dispatch(joinGame(id));
    });
  }

  return (
    <div>
      <h1>Scribble Home Page</h1>
      <div className="create-room">
        <button className="room-join-buttons" onClick={() => createRoom()}>
          Create and Join room
        </button>
      </div>
      <div className="join-room">
        <button className="room-join-buttons" onClick={() => joinRoom()}>
          Join room with id{" "}
        </button>
        <input type="text" ref={joinRoomId} />
      </div>
    </div>
  );
}
