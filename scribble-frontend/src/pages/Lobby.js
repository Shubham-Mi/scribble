import React from "react";
import Settings from "../components/Settings";
import Title from "../components/Title";

export default function Lobby() {
  return (
    <div className="lobby">
      <Title />
      <div className="lobby__info">
        <Settings />
        <div className="right">
          <div>Start</div>
          <div>Rules</div>
          <div>All Player's avatars</div>
        </div>
      </div>
    </div>
  );
}
