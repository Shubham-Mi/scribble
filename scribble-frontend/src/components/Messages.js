import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Messages() {
  const { socket } = useSelector((state) => state.PlayerStore);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, message];
        return newMessages;
      });
    };

    socket.on("round/guess", messageListener);
  }, [socket]);

  return (
    <div className="message-list">
      {messages.map((message, id) => (
        <div
          key={id}
          className="message-container"
          title={`Sent at ${new Date().toLocaleTimeString()}`}
        >
          <span className="user">{message.username}:</span>
          <span className="message">
            {message.validity === true ? "guessed correctly" : message.value}
          </span>
          <span className="date">{new Date().toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
}
