import React, { useEffect, useCallback, useRef } from "react";
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
        backgroundColor: visible && bomb ? "red" : "#bdbdbd",
        borderTop: !visible ? "2px solid white" : "2px solid #7d7d7d",
        borderLeft: !visible ? "2px solid white" : "2px solid #7d7d7d",
        borderRight: !visible ? "2px solid #707070" : "2px solid #7d7d7d",
        borderBottom: !visible ? "2px solid #707070" : "2px solid #7d7d7d",
        width: dificulty === "Medium" ? "30px" : dificulty === "Hard" && "25px",
        height:
          dificulty === "Medium" ? "28px" : dificulty === "Hard" && "25px",
        backgroundImage: flag
          ? "url('https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/15574596561537355607-512.png')"
          : value === "B" &&
            visible &&
            "url('https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/9194672661559033162-512.png')",
        color:
          value === "B" || value === 0
            ? "transparent"
            : value === 1
            ? "#150dba"
            : value === 2
            ? "#205d21"
            : value === 3
            ? "#c3282e"
            : value === 4
            ? "#06006b"
            : value === 5
            ? "#6b0c07"
            : value === 7
            ? "#000000"
            : value === 6
            ? "#007b7b"
            : value === 8
            ? "#777777"
            : ""
      }}
      onClick={() =>
        !visible || !flag ? showValue(coordenates.x, coordenates.y) : null
      }
    >
      {!visible ? "" : value}
    </div>
  );
};
