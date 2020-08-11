import React from "react";

export const ScoresReceived = ({ scoresToDisplay }) => {
  return (
    <table style={{ width: "80%" }}>
      {scoresToDisplay.map((score, index) => {
        return (
          <tr key={index} style={{ color: index === 1 && "red" }}>
            <th>{score.user}</th>
            <th>{score.time}s</th>
          </tr>
        );
      })}
    </table>
  );
};
