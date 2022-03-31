import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Timer() {
  const { time } = useSelector((state) => state.RoomStore);
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setTimer(time);
      }, 5000);
    }
  }, [time, timer]);

  return <div>{timer}</div>;
}
