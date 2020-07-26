import React, { useState } from "react";
import "./Cell.css";

export const Cell = ({
  bomb,
  value,
  showValue,
  coordenates,
  visible,
  dificulty,
}) => {
  return (
    <div
      className="cell"
      style={{
        backgroundColor: visible && bomb && "red",
        cursorEvents: visible && "none",
        width: dificulty === "Medium" ? "35px" : dificulty === "Hard" && "30px",
        height:
          dificulty === "Medium" ? "35px" : dificulty === "Hard" && "30px",
      }}
      onClick={() => showValue(coordenates.x, coordenates.y)}
    >
      {!visible ? "" : value}
    </div>
  );
};
