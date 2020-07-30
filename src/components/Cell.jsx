import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Cell.css";

export const Cell = ({
  bomb,
  value,
  showValue,
  coordenates,
  visible,
  dificulty,
  showFlag,
  flag,
  board
}) => {
  const [cellPressed, setCellPressed] = useState(false);

  const outerRef = useRef(null);

  const pressedRight = useCallback(
    event => {
      event.preventDefault();
      if (outerRef && outerRef.current.contains(event.target)) {
        showFlag(coordenates.x, coordenates.y);
      }
    },
    [outerRef, board]
  );

  useEffect(() => {
    document.addEventListener("contextmenu", pressedRight);
    return () => {
      document.removeEventListener("contextmenu", pressedRight);
    };
  }, [pressedRight]);
  return (
    <div
      className="cell"
      ref={outerRef}
      style={{
        backgroundColor: visible && bomb && "red",
        width: dificulty === "Medium" ? "35px" : dificulty === "Hard" && "30px",
        height:
          dificulty === "Medium" ? "35px" : dificulty === "Hard" && "30px",
        backgroundImage: flag
          ? "url('https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/15574596561537355607-512.png')"
          : value === "B" &&
            visible &&
            "url('https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/9194672661559033162-512.png')",
        color: value === "B" && "transparent"
      }}
      onClick={() =>
        !visible || !flag ? showValue(coordenates.x, coordenates.y) : null
      }
    >
      {!visible ? "" : value}
    </div>
  );
};
