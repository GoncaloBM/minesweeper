import React from "react";
import "./Board.css";
import { Cell } from "./Cell";

export const Board = ({
  dificulty,
  looseGame,
  board,
  bombs,
  rows,
  setBoard,
  setCellsToWin,
  cellsToWin,
  loose
}) => {
  const win = cel => {
    let cellsWining = cel;
    cellsWining--;

    if (cellsWining === bombs) {
      alert("You Win!");
    }

    return cellsWining;
  };

  const showValue = (coordX, coordY) => {
    if (!loose) {
      let boardToChange = [...board];

      for (let i = 0; i < boardToChange.length; i++) {
        if (
          boardToChange[i]["coordenates"]["x"] === coordX &&
          boardToChange[i]["coordenates"]["y"] === coordY
        ) {
          boardToChange[i]["visible"] = true;
          setBoard(boardToChange);

          if (boardToChange[i]["value"] === 0) {
            revealNeighbours(coordX, coordY);
          } else if (boardToChange[i]["value"] > 0) {
            setCellsToWin(win(cellsToWin));
          } else if (boardToChange[i]["value"] === "B") {
            looseGame();
            alert("You loose, sorry!");
          }
        }
      }
    }
  };

  const showFlag = (coordX, coordY) => {
    if (!loose) {
      let boardToChange = [...board];
      for (let i = 0; i < boardToChange.length; i++) {
        if (
          boardToChange[i]["coordenates"]["x"] === coordX &&
          boardToChange[i]["coordenates"]["y"] === coordY
        ) {
          boardToChange[i]["flag"] = !boardToChange[i]["flag"];
          setBoard(boardToChange);
        }
      }
    }
  };

  const revealNeighbours = (clickX, clickY) => {
    let neightoChange = [...board];
    let cellsWin = cellsToWin;

    let neighboursToCheck = [
      { x: clickX - 1, y: clickY - 1 },
      { x: clickX, y: clickY - 1 },
      { x: clickX + 1, y: clickY - 1 },
      { x: clickX - 1, y: clickY },
      { x: clickX + 1, y: clickY },
      { x: clickX - 1, y: clickY + 1 },
      { x: clickX, y: clickY + 1 },
      { x: clickX + 1, y: clickY + 1 }
    ];
    for (let i = 0; i < neightoChange.length; i++) {
      for (let j = 0; j < neighboursToCheck.length; j++) {
        if (
          neightoChange[i]["coordenates"]["x"] === neighboursToCheck[j]["x"] &&
          neightoChange[i]["coordenates"]["y"] === neighboursToCheck[j]["y"]
        ) {
          if (neightoChange[i]["value"] === 0 && !neightoChange[i]["visible"]) {
            neighboursToCheck.push(
              {
                x: neightoChange[i]["coordenates"]["x"] - 1,
                y: neightoChange[i]["coordenates"]["y"] - 1
              },
              {
                x: neightoChange[i]["coordenates"]["x"],
                y: neightoChange[i]["coordenates"]["y"] - 1
              },
              {
                x: neightoChange[i]["coordenates"]["x"] + 1,
                y: neightoChange[i]["coordenates"]["y"] - 1
              },
              {
                x: neightoChange[i]["coordenates"]["x"] - 1,
                y: neightoChange[i]["coordenates"]["y"]
              },
              {
                x: neightoChange[i]["coordenates"]["x"] + 1,
                y: neightoChange[i]["coordenates"]["y"]
              },
              {
                x: neightoChange[i]["coordenates"]["x"] - 1,
                y: neightoChange[i]["coordenates"]["y"] + 1
              },
              {
                x: neightoChange[i]["coordenates"]["x"],
                y: neightoChange[i]["coordenates"]["y"] + 1
              },
              {
                x: neightoChange[i]["coordenates"]["x"] + 1,
                y: neightoChange[i]["coordenates"]["y"] + 1
              }
            );
          }
          if (neightoChange[i]["visible"] === false) {
            cellsWin = win(cellsWin);
          }
          neightoChange[i]["visible"] = true;
        }
      }
    }
    setBoard(neightoChange);
    setCellsToWin(cellsWin - 1);
  };

  return (
    <div className="game">
      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${rows},auto)`,
          width: dificulty === "Easy" ? "450px" : ""
        }}
      >
        {board.map((cell, index) => {
          return (
            <Cell
              coordenates={cell.coordenates}
              flag={cell.flag}
              bomb={cell.bomb}
              value={cell.value}
              showValue={showValue}
              visible={cell.visible}
              dificulty={dificulty}
              loose={loose}
              showFlag={showFlag}
              board={board}
            />
          );
        })}
      </div>
    </div>
  );
};
