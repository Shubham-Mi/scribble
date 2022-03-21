import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Canvas() {
  const { socket, roomId } = useSelector((state) => state.GameStore);
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [eraser, setEraser] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  let batch = [];
  let isRequestTimed = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "rgb(255, 255, 255)";
    ctx.current = context;
    console.log(ctx.current);
  }, []);

  function drawOnCanvas(startX, startY, currentX, currentY) {
    ctx.current.fillStyle = "rgb(0, 0, 0)";
    ctx.current.beginPath();
    ctx.current.moveTo(startX, startY);
    ctx.current.lineTo(currentX, currentY);
    ctx.current.stroke();
  }

  function eraseOnCanvas(currentX, currentY) {
    ctx.current.fillStyle = "rgb(255, 255, 255)";
    ctx.current.fillRect(currentX, currentY, 20, 20);
  }

  socket.on("draw/command", (commands) => {
    commands.forEach((command) => {
      if (command[0] === 0) {
        // Drawing
        drawOnCanvas(command[1], command[2], command[3], command[4]);
      } else if (command[0] === 1) {
        // Erasing
        eraseOnCanvas(command[3], command[4]);
      }
    });
  });

  function sendDrawCommand(command, currentX, currentY) {
    batch.push([command, startX, startY, currentX, currentY]);
    if (!isRequestTimed) {
      setTimeout(() => {
        socket.emit("draw/command", batch, roomId);
        isRequestTimed = false;
        batch = [];
      }, 50);
      isRequestTimed = true;
    }
  }

  const startDrawing = (e) => {
    setDrawing(true);
    setStartX(e.nativeEvent.offsetX);
    setStartY(e.nativeEvent.offsetY);
  };

  const drawLine = (e) => {
    const currentX = e.nativeEvent.offsetX;
    const currentY = e.nativeEvent.offsetY;

    if (drawing) {
      if (eraser) {
        eraseOnCanvas(currentX, currentY);
        sendDrawCommand(1, currentX, currentY);
      } else {
        drawOnCanvas(startX, startY, currentX, currentY);
        sendDrawCommand(0, currentX, currentY);
        setStartX(currentX);
        setStartY(currentY);
      }
    }
  };

  const clearCanvas = () => {
    ctx.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setEraser(false);
  };

  return (
    <div className="canvas-container">
      <canvas
        id="drawing-area"
        height="500"
        width="500"
        ref={canvasRef}
        onMouseDown={(e) => startDrawing(e)}
        onMouseMove={(e) => drawLine(e)}
        onMouseUp={() => setDrawing(false)}
      ></canvas>
      <div className="canvas-container__tools">
        <div className="tool pencil" onClick={() => setEraser(false)}>
          Pencil
        </div>
        <div className="tool eraser" onClick={() => setEraser(true)}>
          Eraser
        </div>
        <div className="tool clear" onClick={clearCanvas}>
          Clear
        </div>
      </div>
    </div>
  );
}
