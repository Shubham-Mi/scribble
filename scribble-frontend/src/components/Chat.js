import React, { useState } from "react";
import Messages from "./Messages";
import { useSelector } from "react-redux";

export default function Chat() {
  const { socket, roomId } = useSelector((state) => state.GameStore);
  const [value, setValue] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("message", value, roomId);
    setValue("");
  };
  return (
    <>
      <h1>Chat</h1>
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
    </>
  );
}
