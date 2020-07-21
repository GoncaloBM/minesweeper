import React, { useState, useEffect } from "react";

export const Menu = ({ changeDificulty }) => {
  const dificulties = ["Easy", "Medium", "Hard"];
  return (
    <div className="menu">
      <div className="selection-text">Select your difficult</div>
      {dificulties.map((dificulty, index) => {
        return (
          <div
            className="dificulty-button"
            onClick={() => changeDificulty(dificulty)}
          >
            {dificulty}
          </div>
        );
      })}
    </div>
  );
};
