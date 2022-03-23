import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinGame, changeGameState } from "../store/GameStore";
import Avatars from "../components/Avatars";

export default function Home() {
  const { socket } = useSelector((state) => state.GameStore);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("avatar1");
  const dispatch = useDispatch();

  function selectAvatar(name) {
    setAvatar(name);
  }

  const sumbitForm = (e) => {
    e.preventDefault();

    if (value === "") {
      socket.emit("create-room", name, avatar, (id) => {
        dispatch(joinGame(id));
      });
    } else {
      socket.emit("join-room", value, name, avatar, (id) => {
        dispatch(joinGame(id));
        console.log(id);
      });
    }
    dispatch(changeGameState("lobby"));
  };

  return (
    <div className="home">
      <div className="avatars">
        <p className="choose__avatar">Choose an avatar</p>
        <Avatars selectAvatar={selectAvatar} />
      </div>
      <form className="form__info" onSubmit={sumbitForm}>
        <div className="title">Scribble</div>
        <input
          className="name-input"
          autoFocus
          value={name}
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <input
          className="room-input"
          value={value}
          placeholder="Enter room Id"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
        <button className="room-join-buttons">
          {value === "" && `Create Room`}
          {value !== "" && "Join Room"}
        </button>
      </form>
    </div>
  );
}
