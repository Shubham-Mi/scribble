import React from "react";
import { useDispatch } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { BsEraserFill } from "react-icons/bs";
import {
  selectEraser,
  selectPen,
  changePenColor,
} from "../services/CanvasServices";

const colors = [
  "FFFFFF",
  "C1C1C1",
  "EF130B",
  "FF7100",
  "FFE400",
  "00CC00",
  "00B2FF",
  "231FD3",
  "AE00BA",
  "D37CAA",
  "A0522D",
  "000000",
  "4C4C4C",
  "740B07",
  "C23800",
  "E8A200",
  "005510",
  "00569E",
  "0E0865",
  "550069",
  "A7FF74",
  "63300D",
];

export default function CanvasTools() {
  const dispatch = useDispatch();

  return (
    <div className="canvas-toolbar">
      <div className="canvas__tools">
        <div
          id="tool_pencil"
          className="tool pencil"
          onClick={() => selectPen(dispatch)}
        >
          <FaPencilAlt />
        </div>
        <div className="tool eraser" onClick={() => selectEraser(dispatch)}>
          <BsEraserFill />
        </div>
      </div>
      <div className="canvas__colors">
        {colors.map((color) => (
          <div
            key={color}
            className={`tool color ${
              color[0] >= "0" && color[0] <= "9" ? "Z" : ""
            }${color}`}
            onClick={() => {
              changePenColor(dispatch, `#${color}`);
              document.getElementById("tool_pencil").className = `tool pencil ${
                color[0] >= "0" && color[0] <= "9" ? "Z" : ""
              }${color}`;
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
