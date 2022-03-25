import React from "react";
import { useDispatch } from "react-redux";
import Rules from "../components/Rules";
import Settings from "../components/Settings";
import Title from "../components/Title";
import AllPlayers from "../components/AllPlayers";
import { changeGameState } from "../store/RoomStore";

export default function Lobby() {
  const dispatch = useDispatch();

  const setGameState = () => {
    dispatch(changeGameState("start"));
  };

  return (
    <div className="lobby">
      <Title />
      <div className="lobby__info">
        <Settings />
        <button className="start" onClick={setGameState}>
          Start
        </button>
        <Rules />
      </div>
      <AllPlayers />
    </div>
  );
}
