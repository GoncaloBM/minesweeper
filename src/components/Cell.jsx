import React from "react";
import "./Cell.css";

export const Cell = ({ bomb }) => {
  return (
    <div className="cell" style={{ backgroundColor: bomb && "red" }}></div>
  );
};
