import React, { useState } from "react";
import "./Cell.css";

export const Cell = ({ bomb, value }) => {
  const [visibleValue, setVisibleValue] = useState(false);
  const exposeValue = () => {
    setVisibleValue(true);
  };
  return (
    <div
      className="cell"
      style={{ backgroundColor:  bomb && "red" }}
      onClick={exposeValue}
    >
      {!visibleValue ? "" : value}
    </div>
  );
};
