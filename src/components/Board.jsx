import React, { useState, useEffect } from "react";
import "./Board.css";
import { Cell } from "./Cell";

export const Board = ({ dificulty }) => {
  const [gameLoaded, setGameLoaded] = useState(false);
  const [bombsLoaded, setBombsLoaded] = useState(false);
  const [valuesLoaded, setValuesLoaded] = useState(false);
  const [board, setBoard] = useState([]);
  const [rows, setRows] = useState(9);
  const [cellsPerRow, setCellsPerRows] = useState(9);
  const [bombs, setBombs] = useState(10);

  const [cellsToWin, setCellsToWin] = useState(rows * cellsPerRow);

  const win = (cel) => {
    let cellsWining = cel;
    cellsWining--;

    if (cellsWining === bombs) {
      alert("You Win!");
    }

    return cellsWining;
  };

  const randomBombs = (all) => {
    let currentBoard = all;
    let numberOfBombs = bombs;
    while (numberOfBombs) {
      let bombRow = Math.floor(Math.random() * rows) + 1;
      let bombCell = Math.floor(Math.random() * cellsPerRow) + 1;

      let placedBomb = false;

      for (let i = 0; i < currentBoard.length; i++) {
        if (
          currentBoard[i]["coordenates"]["x"] === bombCell &&
          currentBoard[i]["coordenates"]["y"] === bombRow &&
          currentBoard[i]["bomb"] === false
        ) {
          currentBoard[i]["bomb"] = true;
          placedBomb = true;
        }
      }

      if (placedBomb) {
        numberOfBombs--;
      }
    }
    generateValues(currentBoard);
  };

  const generateCells = () => {
    const cells = rows * cellsPerRow;
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
    randomBombs(allCells);
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
      { x: clickX + 1, y: clickY + 1 },
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
                y: neightoChange[i]["coordenates"]["y"] - 1,
              },
              {
                x: neightoChange[i]["coordenates"]["x"],
                y: neightoChange[i]["coordenates"]["y"] - 1,
              },
              {
                x: neightoChange[i]["coordenates"]["x"] + 1,
                y: neightoChange[i]["coordenates"]["y"] - 1,
              },
              {
                x: neightoChange[i]["coordenates"]["x"] - 1,
                y: neightoChange[i]["coordenates"]["y"],
              },
              {
                x: neightoChange[i]["coordenates"]["x"] + 1,
                y: neightoChange[i]["coordenates"]["y"],
              },
              {
                x: neightoChange[i]["coordenates"]["x"] - 1,
                y: neightoChange[i]["coordenates"]["y"] + 1,
              },
              {
                x: neightoChange[i]["coordenates"]["x"],
                y: neightoChange[i]["coordenates"]["y"] + 1,
              },
              {
                x: neightoChange[i]["coordenates"]["x"] + 1,
                y: neightoChange[i]["coordenates"]["y"] + 1,
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

  const generateValues = (boardWithBombs) => {
    let currentBoard = boardWithBombs;
    for (let i = 0; i < currentBoard.length; i++) {
      let currentX = currentBoard[i]["coordenates"]["x"];
      let currentY = currentBoard[i]["coordenates"]["y"];

      if (currentBoard[i]["bomb"] === false) {
        for (let j = 0; j < currentBoard.length; j++) {
          if (
            currentBoard[j]["coordenates"]["x"] === currentX - 1 &&
            currentBoard[j]["coordenates"]["y"] === currentY - 1 &&
            currentBoard[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            currentBoard[j]["coordenates"]["x"] === currentX &&
            currentBoard[j]["coordenates"]["y"] === currentY - 1 &&
            currentBoard[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            currentBoard[j]["coordenates"]["x"] === currentX + 1 &&
            currentBoard[j]["coordenates"]["y"] === currentY - 1 &&
            currentBoard[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            currentBoard[j]["coordenates"]["x"] === currentX - 1 &&
            currentBoard[j]["coordenates"]["y"] === currentY &&
            currentBoard[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            currentBoard[j]["coordenates"]["x"] === currentX + 1 &&
            currentBoard[j]["coordenates"]["y"] === currentY &&
            currentBoard[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            currentBoard[j]["coordenates"]["x"] === currentX - 1 &&
            currentBoard[j]["coordenates"]["y"] === currentY + 1 &&
            currentBoard[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            currentBoard[j]["coordenates"]["x"] === currentX &&
            currentBoard[j]["coordenates"]["y"] === currentY + 1 &&
            currentBoard[j]["bomb"] === true
          ) {
            currentBoard[i]["value"]++;
          } else if (
            currentBoard[j]["coordenates"]["x"] === currentX + 1 &&
            currentBoard[j]["coordenates"]["y"] === currentY + 1 &&
            currentBoard[j]["bomb"] === true
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
    setGameLoaded(true);
  };

  useEffect(() => {
    if (!gameLoaded) {
      generateCells();
    }

    // if (!bombsLoaded && gameLoaded) {
    //   randomBombs();
    // }

    // if (!valuesLoaded && bombsLoaded && gameLoaded) {
    //   generateValues();
    // }
    generateCells();
    if (dificulty === "Easy") {
      setRows(9);
      setCellsPerRows(9);
      setCellsToWin(9 * 9);
      setBombs(10);
    } else if (dificulty === "Medium") {
      setRows(16);
      setCellsPerRows(16);
      setCellsToWin(16 * 16);
      setBombs(40);
    } else if (dificulty === "Hard") {
      setRows(30);
      setCellsPerRows(16);
      setCellsToWin(16 * 30);
      setBombs(99);
    }
  }, [gameLoaded, dificulty, rows, cellsPerRow]);

  return (
    <div className="game">
      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${rows},auto)`,
          width: dificulty === "Easy" ? "450px" : "",
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
            />
          );
        })}
      </div>
    </div>
  );
};
