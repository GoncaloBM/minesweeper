import React from "react";

export const ScoresReceived = ({ scoresToDisplay }) => {
  return (
    <table style={{ width: "80%", position: "absolute", bottom: "0" }}>
      {scoresToDisplay.map((score, index) => {
        return (
          score && (
            <tr key={index} style={{ color: index === 1 && "red" }}>
              <th>{score.user}</th>
              <th>{score.time}s</th>
            </tr>
          )
        );
      })}
    </table>
  );
};
