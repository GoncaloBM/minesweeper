import React, { useState, useEffect } from "react";
import "./App.css";
import { Board } from "./components/Board.jsx";
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";

function App() {
  const [dificulty, setDificulty] = useState("Easy");
  const [gameStart, setGameStart] = useState(false);
  const [loose, setLoose] = useState(false);

  const [gameLoaded, setGameLoaded] = useState(false);
  const [board, setBoard] = useState([]);
  const [rows, setRows] = useState(9);
  const [cellsPerRow, setCellsPerRows] = useState(9);
  const [bombs, setBombs] = useState(10);
  const [cellsToWin, setCellsToWin] = useState(rows * cellsPerRow);

  const generateCells = () => {
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

  const randomBombs = all => {
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

  const generateValues = boardWithBombs => {
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

  const changeDificulty = difi => {
    setDificulty(difi);
  };

  const looseGame = () => {
    setLoose(true);
  };

  const resetGame = () => {
    generateCells();
    setLoose(false);
  };

  const startGame = () => {
    setGameStart(true);
  };

  useEffect(() => {
    if (!gameLoaded) {
      generateCells();
    }
    generateCells();
  }, [gameLoaded, dificulty, rows, cellsPerRow]);

  return (
    <div className="App">
      <div className="title">Minesweeper</div>
      {gameStart === true && <Navbar loose={loose} resetGame={resetGame} />}
      {gameStart === true && (
        <Board
          dificulty={dificulty}
          looseGame={looseGame}
          loose={loose}
          board={board}
          bombs={bombs}
          cellsToWin={cellsToWin}
          setBoard={setBoard}
          setCellsToWin={setCellsToWin}
          rows={rows}
        />
      )}
      {gameStart === false && (
        <Menu
          changeDificulty={changeDificulty}
          startGame={startGame}
          dificultyApp={dificulty}
        />
      )}
    </div>
  );
}

export default App;
