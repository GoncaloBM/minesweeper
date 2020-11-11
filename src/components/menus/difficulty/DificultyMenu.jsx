import React from "react";
import "./DificultyMenu.css";

export const DificultyMenu = ({
  dificultyApp,
  changeDificulty,
  goToMainMenu,
}) => {
  const dificulties = ["Easy", "Medium", "Hard"];
  return (
    <div className="dificulty-menu">
      <div className="back-icon" onClick={goToMainMenu}></div>
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
                fontSize: "1.5rem",
              }}
            >
              {dificulty}
            </div>
          );
        })}
      </div>
      
    </div>
  );
};
