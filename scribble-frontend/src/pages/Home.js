import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinGame, changeGameState } from "../store/RoomStore";
import { setPlayerName, setPlayerAvatar } from "../store/PlayerStore";
import Avatars from "../components/Avatars";
import Title from "../components/Title";

export default function Home() {
  const { socket } = useSelector((state) => state.PlayerStore);
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("avatar1");
  const dispatch = useDispatch();

  function selectAvatar(name) {
    setAvatar(name);
    for (let i = 1; i <= 28; i++) {
      document.getElementById(`avatar${i}`).classList.remove("avatar-selected");
    }
    document.getElementById(name).classList.add("avatar-selected");
  }

  const sumbitForm = (e) => {
    e.preventDefault();

    if (room === "") {
      socket.emit("create-room", name, avatar, (id) => {
        dispatch(joinGame(id));
      });
    } else {
      socket.emit("join-room", room, name, avatar, (id) => {
        dispatch(joinGame(id));
        console.log(id);
      });
    }
    dispatch(setPlayerName(name));
    dispatch(setPlayerAvatar(avatar));
    dispatch(changeGameState("lobby"));
  };

  return (
    <div className="home">
      <div className="avatars">
        <p className="choose__avatar">Choose an avatar</p>
        <Avatars selectAvatar={selectAvatar} />
      </div>
      <form className="form__info" onSubmit={sumbitForm}>
        <Title />
        <input
          className="form__input"
          id="name-input"
          placeholder="Enter your name"
          autoFocus
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <input
          className="form__input"
          id="room-input"
          placeholder="Enter room Id"
          value={room}
          onChange={(e) => {
            setRoom(e.currentTarget.value);
          }}
        />
        <button className="form__submit">
          {room === "" && `Create Room`}
          {room !== "" && "Join Room"}
        </button>
      </form>
    </div>
  );
}
