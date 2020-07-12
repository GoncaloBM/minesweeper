import React, { useState, useEffect } from "react";
import "./Board.css";
import { Cell } from "./Cell";

export const Board = () => {
  const [gameLoaded, setGameLoaded] = useState(false);
  const [bombsLoaded, setBombsLoaded] = useState(false);
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
      console.log(currentBoard);

      for (let i = 0; i < currentBoard.length; i++) {
        if (
          currentBoard[i]["coordenates"]["x"] === bombCell &&
          currentBoard[i]["coordenates"]["y"] === bombRow
        ) {
          currentBoard[i]["bomb"] = true;
          setBoard(currentBoard);
        }
      }
      numberOfBombs--;
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
        value: "",
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

  useEffect(() => {
    if (!gameLoaded) {
      generateCells();
    }

    if (!bombsLoaded && gameLoaded) {
      randomBombs();
    }
  }, [gameLoaded, board]);

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
          />
        );
      })}
    </div>
  );
};
