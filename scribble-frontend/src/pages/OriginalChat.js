import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function Chat() {
  const { socket, roomId } = useSelector((state) => state.GameStore);
  const messageContainer = useRef(null);
  const messageInput = useRef(null);

  function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    messageContainer.current.append(div);
  }

  useEffect(() => {
    displayMessage(`You connected with id -> ${socket.id}`);
  });

  socket.on("receive-message", (message) => {
    console.log("Message Received");
    // displayMessage(message);
  });

  function sendMessage() {
    if (messageInput.current.value === "") return;
    const message = messageInput.current.value;
    displayMessage(message);
    socket.emit("send-message", message, roomId);
    console.log("Message Sent");
    messageInput.current.value = "";
  }

  return (
    <div>
      <div id="message-container" ref={messageContainer}></div>
      <div>
        Message <input type="text" id="message-input" ref={messageInput} />
        <button
          type="submit"
          id="send-message-button"
          onClick={() => sendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
