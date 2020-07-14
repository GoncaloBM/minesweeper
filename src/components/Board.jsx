import React, { useState, useEffect } from "react";
import "./Board.css";
import { Cell } from "./Cell";

export const Board = () => {
  const [gameLoaded, setGameLoaded] = useState(false);
  const [bombsLoaded, setBombsLoaded] = useState(false);
  const [valuesLoaded, setValuesLoaded] = useState(false);
  const [board, setBoard] = useState([]);
  const rows = 5;
  const cellsPerRow = 5;
  const cells = rows * cellsPerRow;

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
        visible: false,
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

  const showValue = (coordX, coordY) => {};

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
          />
        );
      })}
    </div>
  );
};
