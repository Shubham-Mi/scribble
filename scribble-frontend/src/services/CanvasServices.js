import {
  setDrawing,
  setErasing,
  setStartX,
  setStartY,
  setPenColor,
} from "../store/CanvasStore";

export function eraseOnCanvas(context, currentX, currentY, color) {
  context.current.fillStyle = color;
  context.current.fillRect(currentX, currentY, 20, 20);
}

export function clearCanvas(context, canvas) {
  context.current.clearRect(0, 0, canvas.width, canvas.height);
}

export function selectPen(dispatch) {
  dispatch(setErasing(false));
}

export function selectEraser(dispatch) {
  dispatch(setErasing(true));
}

export function stopDrawing(dispatch) {
  dispatch(setDrawing(false));
}

export function changePenColor(dispatch, color) {
  dispatch(setPenColor(color));
}

export function setStartPositon(dispatch, coordinates) {
  dispatch(setDrawing(true));
  dispatch(setStartX(coordinates.offsetX));
  dispatch(setStartY(coordinates.offsetY));
}

let batch = [];
let isRequestTimed = false;

export function sendDrawCommand(
  socket,
  roomId,
  command,
  startX,
  startY,
  currentX,
  currentY
) {
  batch.push([command, startX, startY, currentX, currentY]);
  if (!isRequestTimed) {
    setTimeout(() => {
      socket.emit("canvas-draw", batch, roomId);
      isRequestTimed = false;
      batch = [];
    }, 50);
    isRequestTimed = true;
  }
}

export function drawOnCanvas(
  context,
  startX,
  startY,
  currentX,
  currentY,
  color
) {
  context.current.fillStyle = color;
  context.current.strokeStyle = color;
  context.current.beginPath();
  context.current.moveTo(startX, startY);
  context.current.lineTo(currentX, currentY);
  context.current.stroke();
}
