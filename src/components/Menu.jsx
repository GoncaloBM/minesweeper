import React, { useState, useEffect } from "react";
import "./Menu.css";

export const Menu = ({ changeDificulty, startGame, dificultyApp }) => {
  const dificulties = ["Easy", "Medium", "Hard"];
  return (
    <div className="menu">
      <div className="selection-text">Select your difficult</div>
      <div className="dificulties">
        {dificulties.map((dificulty, index) => {
          return (
            <div
              className="dificulty-button"
              onClick={() => changeDificulty(dificulty)}
              style={{ color: dificulty === dificultyApp && "red" }}
            >
              {dificulty}
            </div>
          );
        })}
      </div>

      <div className="start-game" onClick={startGame}>
        Start Game
      </div>
    </div>
  );
};
