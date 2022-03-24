import React from "react";
import Rules from "../components/Rules";
import Settings from "../components/Settings";
import Title from "../components/Title";

export default function Lobby() {
  return (
    <div className="lobby">
      <Title />
      <div className="lobby__info">
        <Settings />
        <div className="start">Start</div>
        <Rules />
      </div>
      <div>All Player's avatars</div>
    </div>
  );
}
