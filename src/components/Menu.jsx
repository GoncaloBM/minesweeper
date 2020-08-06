import React from "react";
import "./Menu.css";

export const Menu = ({
  startGame,
  goToDificultyMenu,
  goToInstructionsMenu
}) => {
  return (
    <div className="menu">
      <div className="menu-button" onClick={startGame} style={{color:'black', fontSize:'2rem'}}>
        Start Game
      </div>

      <div className="menu-button" onClick={goToDificultyMenu} >
        Select Your Dificulty
      </div>
      <div className="menu-button" onClick={goToInstructionsMenu}>Instructions</div>
      <div className="menu-button">Scoreboard</div>
    </div>
  );
};
