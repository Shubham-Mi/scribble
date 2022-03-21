import {
  setDrawing,
  setErasing,
  setStartX,
  setStartY,
} from "../store/CanvasStore";

export function drawOnCanvas(context, startX, startY, currentX, currentY) {
  context.current.fillStyle = "rgb(255, 255, 255)";
  context.current.beginPath();
  context.current.moveTo(startX, startY);
  context.current.lineTo(currentX, currentY);
  context.current.stroke();
}

export function eraseOnCanvas(context, currentX, currentY) {
  context.current.fillStyle = "rgb(255, 255, 255)";
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

export function setStartPositon(dispatch, coordinates) {
  dispatch(setDrawing(true));
  dispatch(setStartX(coordinates.offsetX));
  dispatch(setStartY(coordinates.offsetY));
}