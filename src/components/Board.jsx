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
  loose,
  checkRemainingFlags,
  flagsRemaining,
  setStartTimer,
  setEndMenu,
  resetMenu,
  winner,
  setWinner,
  cellsPerRow
}) => {
  const win = cel => {
    let cellsWining = cel;
    cellsWining--;

    if (cellsWining === bombs) {
      setEndMenu(true);
      setWinner(true);
      setStartTimer(false);
    }

    return cellsWining;
  };

  const showValue = (coordX, coordY) => {
    if (!loose) {
      let boardToChange = [...board];

      for (let i = 0; i < boardToChange.length; i++) {
        if (
          boardToChange[i]["coordenates"]["x"] === coordX &&
          boardToChange[i]["coordenates"]["y"] === coordY &&
          !boardToChange[i]["visible"]
        ) {
          boardToChange[i]["visible"] = true;
          setBoard(boardToChange);

          if (boardToChange[i]["value"] === 0) {
            revealNeighbours(coordX, coordY);
          } else if (boardToChange[i]["value"] > 0) {
            setCellsToWin(win(cellsToWin));
          } else if (boardToChange[i]["value"] === "B") {
            looseGame();
            showAllCells();
            setEndMenu(true);
          }
        }
      }
    }
  };

  const showFlag = (coordX, coordY) => {
    let boardToChange = [...board];
    if (flagsRemaining < bombs - 1) {
      if (!loose) {
        for (let i = 0; i < boardToChange.length; i++) {
          if (
            boardToChange[i]["coordenates"]["x"] === coordX &&
            boardToChange[i]["coordenates"]["y"] === coordY &&
            !boardToChange[i]["visible"]
          ) {
            boardToChange[i]["flag"] = !boardToChange[i]["flag"];
          }
        }
      }
    } else {
      for (let i = 0; i < boardToChange.length; i++) {
        if (
          boardToChange[i]["coordenates"]["x"] === coordX &&
          boardToChange[i]["coordenates"]["y"] === coordY
        ) {
          boardToChange[i]["flag"] = false;
        }
      }
    }
    setBoard(boardToChange);
    checkRemainingFlags();
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
    for (let i = 0; i < neighboursToCheck.length; i++) {
      for (let j = 0; j < neightoChange.length; j++) {
        if (
          neightoChange[j]["coordenates"]["x"] === neighboursToCheck[i]["x"] &&
          neightoChange[j]["coordenates"]["y"] === neighboursToCheck[i]["y"]
        ) {
          if (neightoChange[j]["value"] === 0 && !neightoChange[j]["visible"]) {
            neighboursToCheck.push(
              {
                x: neighboursToCheck[i]["x"] - 1,
                y: neighboursToCheck[i]["y"] - 1
              },
              {
                x: neighboursToCheck[i]["x"],
                y: neighboursToCheck[i]["y"] - 1
              },
              {
                x: neighboursToCheck[i]["x"] + 1,
                y: neighboursToCheck[i]["y"] - 1
              },
              {
                x: neighboursToCheck[i]["x"] - 1,
                y: neighboursToCheck[i]["y"]
              },
              {
                x: neighboursToCheck[i]["x"] + 1,
                y: neighboursToCheck[i]["y"]
              },
              {
                x: neighboursToCheck[i]["x"] - 1,
                y: neighboursToCheck[i]["y"] + 1
              },
              {
                x: neighboursToCheck[i]["x"],
                y: neighboursToCheck[i]["y"] + 1
              },
              {
                x: neighboursToCheck[i]["x"] + 1,
                y: neighboursToCheck[i]["y"] + 1
              }
            );
          }
          if (neightoChange[j]["visible"] === false) {
            cellsWin = win(cellsWin);
          }
          if (neightoChange[j]["flag"] === false) {
            neightoChange[j]["visible"] = true;
          }
        }
      }
    }
    setBoard(neightoChange);
    setCellsToWin(cellsWin - 1);
  };

  const showAllCells = () => {
    let visibleBoard = board;

    for (let i = 0; i < visibleBoard.length; i++) {
      visibleBoard[i]["visible"] = true;
    }

    setBoard(visibleBoard);
  };

  return (
    <div className="game">
      <div
        className="board"
        style={{
          border: "2px solid #7d7d7d",
          display: "grid",
          gridTemplateColumns: `repeat(${rows},auto)`,
          width:
            dificulty === "Easy"
              ? `${rows * 50 + rows * 2 * 2}px`
              : dificulty === "Medium"
              ? `${rows * 28 + rows * 2 * 2}px`
              : dificulty === "Hard" && `${rows * 25 + rows * 2 * 2}px`
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
              key={index}
              resetMenu={resetMenu}
              winner={winner}
              cellsPerRow={cellsPerRow}
              rows={rows}
            />
          );
        })}
      </div>
    </div>
  );
};
