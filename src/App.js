import React, { useState, useEffect } from "react";
import "./App.css";
import { Board } from "./components/Board.jsx";
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";
import { EndMenu } from "./components/EndMenu";

function App() {
  const [gameLoaded, setGameLoaded] = useState(false);
  const [dificulty, setDificulty] = useState("Easy");
  const [gameStart, setGameStart] = useState(false);
  const [loose, setLoose] = useState(false);
  const [board, setBoard] = useState([]);
  const [rows, setRows] = useState(9);
  const [cellsPerRow, setCellsPerRows] = useState(9);
  const [bombs, setBombs] = useState(10);
  const [flagsRemaining, setFlagsRemaining] = useState(0);
  const [cellsToWin, setCellsToWin] = useState(rows * cellsPerRow);
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState(0);
  const [endMenu, setEndMenu] = useState(false);

  const generateCells = () => {
    setFlagsRemaining(0);
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
        visible: false
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
          currentBoard[i]["coordenates"]["x"] === bombRow &&
          currentBoard[i]["coordenates"]["y"] === bombCell &&
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
  };

  const checkRemainingFlags = () => {
    let currentBoard = [...board];

    let flagsInGame = 0;

    for (let i = 0; i < currentBoard.length; i++) {
      if (board[i].flag === true) {
        flagsInGame++;
      }
    }

    setFlagsRemaining(flagsInGame);
  };

  const changeDificulty = difi => {
    setDificulty(difi);
  };

  const looseGame = () => {
    setLoose(true);
    setStartTimer(false);
  };

  const resetGame = () => {
    setStartTimer(false);
    setLoose(false);
    generateCells();
    setTimeout(() => {
      setTime(0);
    }, 1001);
    setTimeout(() => {
      setStartTimer(true);
    }, 1200);
  };

  const startGame = () => {
    setGameStart(true);
    setGameLoaded(true);
    setStartTimer(true);
  };

  const timer = () => {
    const nextTime = time + 1;
    setTimeout(() => {
      setTime(nextTime);
    }, 1000);
  };

  useEffect(() => {
    if (!gameLoaded || !gameStart) {
      generateCells();
    }

    if (startTimer) {
      timer();
    }
  }, [gameLoaded, dificulty, rows, cellsPerRow, time, startTimer]);

  return (
    <div className="App">
      <div className="title" style={{ fontSize: "4rem" }}>
        Minesweeper
      </div>
      {gameStart === true && (
        <Navbar
          loose={loose}
          resetGame={resetGame}
          bombs={bombs}
          flagsRemaining={flagsRemaining}
          time={time}
          startGame={startGame}
        />
      )}
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
          checkRemainingFlags={checkRemainingFlags}
          flagsRemaining={flagsRemaining}
          setStartTimer={setStartTimer}
          setEndMenu={setEndMenu}
        />
      )}
      {gameStart === false && (
        <Menu
          changeDificulty={changeDificulty}
          startGame={startGame}
          dificultyApp={dificulty}
        />
      )}
      {endMenu && <EndMenu loose={loose} setEndMenu={setEndMenu} />}
    </div>
  );
}

export default App;
