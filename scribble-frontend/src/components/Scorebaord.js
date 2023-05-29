import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Scorebaord() {
  const { scoreboard } = useSelector((state) => state.RoomStore);

  useEffect(() => {
    console.log(scoreboard);
  }, [scoreboard]);

  return (
    <div className="scoreboard">
      <h1 className="scoreboard__title">Scoreboard</h1>
      <div className="scoreboard__content">
        {Object.keys(scoreboard).map((key, index) => (
          <div key={index}>
            <h2>{key}</h2>
            <h2>{scoreboard[key]}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
