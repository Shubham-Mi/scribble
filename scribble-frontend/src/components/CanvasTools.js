import React from "react";
import { useDispatch } from "react-redux";
import { selectEraser, selectPen } from "../services/CanvasServices";

export default function CanvasTools() {
  const dispatch = useDispatch();

  return (
    <div className="canvas-container__tools">
      <div className="tool pencil" onClick={() => selectPen(dispatch)}>
        Pencil
      </div>
      <div className="tool eraser" onClick={() => selectEraser(dispatch)}>
        Eraser
      </div>
    </div>
  );
}
