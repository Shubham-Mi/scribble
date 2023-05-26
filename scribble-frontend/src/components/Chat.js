import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import { useSelector } from "react-redux";

export default function Chat() {
  const { socket } = useSelector((state) => state.PlayerStore);
  const [value, setValue] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("session/chat", value);
    setValue("");
  };

  return (
    <div className="chat-container">
      <Messages />
      <form onSubmit={submitForm}>
        <input
          className="message-input"
          autoFocus
          value={value}
          placeholder="Type your message"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </form>
    </div>
  );
}
