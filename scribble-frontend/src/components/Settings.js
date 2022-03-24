import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRounds, setTime } from "../store/RoomStore";

const rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const timers = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180];

export default function Settings() {
  const dispatch = useDispatch();
  const [noofRounds, setNoofRounds] = useState(1);
  const [timePerRound, setTimePerRound] = useState(60);

  const handleRoundChange = (e) => {
    setNoofRounds(e.target.value);
    dispatch(setRounds(e.target.value));
  };

  const handleTimeChange = (e) => {
    setTimePerRound(e.target.value);
    dispatch(setTime(e.target.value));
  };

  return (
    <div className="room-settings">
      <div className="settings__title">Room Settings</div>
      <div className="settings__subtitle">Number of rounds</div>
      <select
        className="setting__select"
        value={noofRounds}
        onChange={handleRoundChange}
      >
        {rounds.map((round) => (
          <option value={round}>{round}</option>
        ))}
      </select>
      <div className="settings__subtitle">Draw time in seconds</div>
      <select
        className="setting__select"
        value={timePerRound}
        onChange={handleTimeChange}
      >
        {timers.map((timer) => (
          <option value={timer}>{timer}</option>
        ))}
      </select>
    </div>
  );
}
