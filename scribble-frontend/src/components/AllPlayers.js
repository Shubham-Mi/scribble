import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleAvatar from "./SingleAvatar";

export default function AllPlayers() {
  const { players } = useSelector((state) => state.RoomStore);
  const [allPlayers, setAllPlayers] = useState({});

  useEffect(() => {
    setAllPlayers(players);
  }, [players]);

  return (
    <div className="players">
      {[...Object.values(allPlayers)].map((player) => (
        <div key={player.id} className="players__player">
          {player.name}
          <SingleAvatar avatarName={player.avatar} />
        </div>
      ))}
    </div>
  );
}
