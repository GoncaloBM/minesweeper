import React, { useState } from "react";
import "./Cell.css";

export const Cell = ({ bomb, value, showValue, coordenates, visible }) => {
  return (
    <div
      className="cell"
      style={{ backgroundColor: bomb && "red" }}
      onClick={() => showValue(coordenates.x, coordenates.y)}
    >
      {!visible ? "" : value}
    </div>
  );
};
