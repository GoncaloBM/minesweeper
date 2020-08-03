import React from "react";
import "./EndMenu.css";

export const EndMenu = ({ loose, setEndMenu }) => {
  return (
    <div className="end-menu">
      <div className="text">
        {loose ? "You Loose :(" : "You Win! Congratulations"}
      </div>
      <div className="ok-button" onClick={() => setEndMenu(false)}>
        OK
      </div>
    </div>
  );
};
