import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStartX, setStartY } from "../store/CanvasStore";
import {
  drawOnCanvas,
  eraseOnCanvas,
  stopDrawing,
  setStartPositon,
  clearCanvas,
  sendDrawCommand,
} from "../services/CanvasServices";

export default function Canvas() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.PlayerStore);
  const { roomId } = useSelector((state) => state.RoomStore);
  const { drawing, erasing, startX, startY, penColor, backgroundColor } =
    useSelector((state) => state.CanvasStore);

  const canvasRef = useRef(null);
  const context = useRef(null);

  function userDraw(e) {
    const currentX = e.nativeEvent.offsetX;
    const currentY = e.nativeEvent.offsetY;

    if (drawing) {
      if (erasing) {
        eraseOnCanvas(context, currentX, currentY, backgroundColor);
        sendDrawCommand(socket, roomId, 1, startX, startY, currentX, currentY);
      } else {
        drawOnCanvas(context, startX, startY, currentX, currentY, penColor);
        sendDrawCommand(socket, roomId, 0, startX, startY, currentX, currentY);
        dispatch(setStartX(currentX));
        dispatch(setStartY(currentY));
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.7;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = penColor;
    ctx.strokeStyle = penColor;
    context.current = ctx;

    const drawFromServer = (commands) => {
      commands.forEach((command) => {
        if (command[0] === 0) {
          drawOnCanvas(
            context,
            command[1],
            command[2],
            command[3],
            command[4],
            penColor
          );
        } else if (command[0] === 1) {
          eraseOnCanvas(context, command[3], command[4], backgroundColor);
        } else if (command[0] === 2) {
          clearCanvas(context, canvasRef.current);
        }
      });
    };

    socket.on("canvas-draw", drawFromServer);
  }, [socket]);

  return (
    <div className="canvas-container">
      <canvas
        id="drawing-area"
        height="500"
        width="500"
        ref={canvasRef}
        onMouseDown={(e) => setStartPositon(dispatch, e.nativeEvent)}
        onMouseMove={(e) => userDraw(e)}
        onMouseUp={() => stopDrawing(dispatch)}
      />
    </div>
    //   <div
    //   className="tool clear"
    //   onClick={() => {
    //     clearCanvas(context, canvasRef.current);
    //     sendDrawCommand(2, 0, 0);
    //   }}
    // >
    //   Clear
    // </div>
  );
}
