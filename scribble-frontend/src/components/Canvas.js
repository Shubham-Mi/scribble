import React, { useEffect, useRef, useState } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);
  const context = useRef(null);

  const [drawing, setDrawing] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(255, 255, 255)";
    context.current = ctx;
  });

  function drawOnCanvas(startX, startY, currentX, currentY) {
    context.current.fillStyle = "rgb(255, 255, 255)";
    context.current.beginPath();
    context.current.moveTo(startX, startY);
    context.current.lineTo(currentX, currentY);
    context.current.stroke();
  }

  function eraseOnCanvas(currentX, currentY) {
    context.current.fillStyle = "rgb(255, 255, 255)";
    context.current.fillRect(currentX, currentY, 20, 20);
  }

  function setStartPositon(e) {
    setDrawing(true);
    setStartX(e.nativeEvent.offsetX);
    setStartY(e.nativeEvent.offsetY);
  }

  function userDraw(e) {
    const currentX = e.nativeEvent.offsetX;
    const currentY = e.nativeEvent.offsetY;

    if (drawing) {
      if (erasing) {
        eraseOnCanvas(currentX, currentY);
      } else {
        drawOnCanvas(startX, startY, currentX, currentY);
        setStartX(currentX);
        setStartY(currentY);
      }
    }
  }

  function stopDrawing() {
    setDrawing(false);
  }

  function clearCanvas() {
    context.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setErasing(false);
  }

  function selectPen() {
    setErasing(false);
  }

  function selectEraser() {
    setErasing(true);
  }

  return (
    <div className="canvas-container">
      <canvas
        id="drawing-area"
        height="500"
        width="500"
        ref={canvasRef}
        onMouseDown={(e) => setStartPositon(e)}
        onMouseMove={(e) => userDraw(e)}
        onMouseUp={() => stopDrawing()}
      />
      <div className="canvas-container__tools">
        <div className="tool pencil" onClick={() => selectPen()}>
          Pencil
        </div>
        <div className="tool eraser" onClick={() => selectEraser()}>
          Eraser
        </div>
        <div className="tool clear" onClick={() => clearCanvas()}>
          Clear
        </div>
      </div>
    </div>
  );
}
