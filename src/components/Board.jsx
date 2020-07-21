import React, { useState, useEffect } from "react";
import "./Board.css";
import { Cell } from "./Cell";

export const Board = ({ dificulty }) => {
  const [gameLoaded, setGameLoaded] = useState(false);
  const [bombsLoaded, setBombsLoaded] = useState(false);
  const [valuesLoaded, setValuesLoaded] = useState(false);
  const [board, setBoard] = useState([]);
  const rows = 6;
  const cellsPerRow = 6;

  const cells = rows * cellsPerRow;
  const [cellsToWin, setCellsToWin] = useState(rows * cellsPerRow);

  const win = cel => {
    let cellsWining = cel;
    cellsWining--;

    if (cellsWining === 5) {
      alert("You Win!");
    }

    return cellsWining;
  };

  const randomBombs = () => {
    let numberOfBombs = 5;
    while (numberOfBombs) {
      let bombRow = Math.floor(Math.random() * rows) + 1;
      let bombCell = Math.floor(Math.random() * cellsPerRow) + 1;

      let currentBoard = board;
      let placedBomb = false;

      for (let i = 0; i < currentBoard.length; i++) {
        if (
          currentBoard[i]["coordenates"]["x"] === bombCell &&
          currentBoard[i]["coordenates"]["y"] === bombRow &&
          currentBoard[i]["bomb"] === false
        ) {
          currentBoard[i]["bomb"] = true;
          setBoard(currentBoard);
          placedBomb = true;
        }
      }

      if (placedBomb) {
        numberOfBombs--;
      }
    }

    setBombsLoaded(true);
  };

  const generateCells = () => {
    let allCells = [];

    let currentRow = 1;
    let currentCell = 1;

    for (let i = 0; i < cells; i++) {
      allCells.push({
        coordenates: { x: currentCell, y: currentRow },
        flag: false,
        bomb: false,
        value: 0,
        visible: false
      });

      currentCell++;

      if (currentCell === rows + 1) {
        currentCell = 1;
        currentRow++;
      }
    }

    setGameLoaded(true);
    setBoard(allCells);
  };

  const showValue = (coordX, coordY) => {
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
          alert("You loose, sorry!");
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
          if (neightoChange[i]["value"] === 0) {
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

  const generateValues = () => {
    let currentBoard = board;
    for (let i = 0; i < board.length; i++) {
      let currentX = board[i]["coordenates"]["x"];
      let currentY = board[i]["coordenates"]["y"];

      if (board[i]["bomb"] === false) {
        for (let j = 0; j < board.length; j++) {
          if (
            board[j]["coordenates"]["x"] === currentX - 1 &&
            board[j]["coordenates"]["y"] === currentY - 1 &&
            board[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            board[j]["coordenates"]["x"] === currentX &&
            board[j]["coordenates"]["y"] === currentY - 1 &&
            board[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            board[j]["coordenates"]["x"] === currentX + 1 &&
            board[j]["coordenates"]["y"] === currentY - 1 &&
            board[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            board[j]["coordenates"]["x"] === currentX - 1 &&
            board[j]["coordenates"]["y"] === currentY &&
            board[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            board[j]["coordenates"]["x"] === currentX + 1 &&
            board[j]["coordenates"]["y"] === currentY &&
            board[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            board[j]["coordenates"]["x"] === currentX - 1 &&
            board[j]["coordenates"]["y"] === currentY + 1 &&
            board[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            board[j]["coordenates"]["x"] === currentX &&
            board[j]["coordenates"]["y"] === currentY + 1 &&
            board[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            board[j]["coordenates"]["x"] === currentX + 1 &&
            board[j]["coordenates"]["y"] === currentY + 1 &&
            board[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          }

          setBoard(currentBoard);
        }
      } else {
        currentBoard[i]["value"] = "B";
        setBoard(currentBoard);
      }
    }
    setValuesLoaded(true);
  };

  useEffect(() => {
    if (!gameLoaded) {
      generateCells();
    }

    if (!bombsLoaded && gameLoaded) {
      randomBombs();
    }

    if (!valuesLoaded && bombsLoaded && gameLoaded) {
      generateValues();
    }
  }, [gameLoaded, bombsLoaded]);

  return (
    <div
      className="board"
      style={{ display: "grid", gridTemplateColumns: `repeat(${rows},auto)` }}
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
          />
        );
      })}
    </div>
  );
};
