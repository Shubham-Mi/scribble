import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Scorebaord() {
  const { scorebaord } = useSelector((state) => state.RoomStore);

  useEffect(() => {
    console.log(scorebaord);
  }, [scorebaord]);

  return (
    <div>
      <h1>Scoreboard</h1>
    </div>
  );
}
