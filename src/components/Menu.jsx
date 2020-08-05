import React from "react";
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
              key={index}
              className="dificulty-button"
              onClick={() => changeDificulty(dificulty)}
              style={{
                color: dificulty === dificultyApp && "red",
                borderTop:
                  dificulty !== dificultyApp
                    ? "2px solid white"
                    : "2px solid #7d7d7d",
                borderLeft:
                  dificulty !== dificultyApp
                    ? "2px solid white"
                    : "2px solid #7d7d7d",
                borderRight:
                  dificulty !== dificultyApp
                    ? "2px solid #707070"
                    : "2px solid #7d7d7d",
                borderBottom:
                  dificulty !== dificultyApp
                    ? "2px solid #707070"
                    : "2px solid #7d7d7d",
                backgroundColor: "#bdbdbd",
                fontSize: "1.5rem"
              }}
            >
              {dificulty}
            </div>
          );
        })}
      </div>

      <div className="start-game" onClick={startGame}>
        Start Game
      </div>
      <div className="menu-button">Instructions</div>
      <div className="menu-button">Scoreboard</div>
    </div>
  );
};
