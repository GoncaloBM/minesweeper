import React, { useState } from "react";
import "./ScoreMenu.css";

export const ScoreMenu = ({goToMainMenu}) => {
  const [dificultyScore, setDificultyScore] = useState("Easy");
  const dificulties = ["Easy", "Medium", "Hard"];
  const [fetchingScores, setFetchingScores] = useState(true);

  const changeScoreDificulty = (e) => {
    setDificultyScore(e);
  };

  return (
      <>
    <div className="score-menu">
      <div className="score-title">Scoreboard</div>
      <div className="score-dificulties">
        {dificulties.map((dificulty, index) => {
          return (
            <div
              key={index}
              className="score-dificulty-button"
              onClick={() => changeScoreDificulty(dificulty)}
              style={{
                color: dificulty === dificultyScore && "red",
                borderTop:
                  dificulty !== dificultyScore
                    ? "2px solid white"
                    : "2px solid #7d7d7d",
                borderLeft:
                  dificulty !== dificultyScore
                    ? "2px solid white"
                    : "2px solid #7d7d7d",
                borderRight:
                  dificulty !== dificultyScore
                    ? "2px solid #707070"
                    : "2px solid #7d7d7d",
                borderBottom:
                  dificulty !== dificultyScore
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
      <div className="scoreboard">
        {fetchingScores ? (
          <div className="fetching-image"></div>
        ) : (
          <table>
            <tr>
              <th># Place</th>
              <th>User Name</th>
              <th>Time [s]</th>
            </tr>
          </table>
        )}
      </div>
    </div>
    <div className="menu-button" onClick={goToMainMenu}>Main Menu</div>
    </>
  );
};
