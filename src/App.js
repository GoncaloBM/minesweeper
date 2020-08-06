import React, { useState, useEffect } from "react";
import "./App.css";
import { Board } from "./components/Board.jsx";
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";
import { EndMenu } from "./components/EndMenu";
import { ResetMenu } from "./components/ResetMenu";
import { DificultyMenu } from "./components/DificultyMenu";
import { InstructionsMenu } from "./components/InstructionsMenu/InstructionsMenu";

function App() {
  const [gameLoaded, setGameLoaded] = useState(false);
  const [dificulty, setDificulty] = useState("Easy");
  const [gameStart, setGameStart] = useState(false);
  const [loose, setLoose] = useState(false);
  const [winner, setWinner] = useState(false);
  const [board, setBoard] = useState([]);
  const [rows, setRows] = useState(9);
  const [cellsPerRow, setCellsPerRows] = useState(9);
  const [bombs, setBombs] = useState(10);
  const [flagsRemaining, setFlagsRemaining] = useState(0);
  const [cellsToWin, setCellsToWin] = useState(rows * cellsPerRow);
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState(0);
  const [endMenu, setEndMenu] = useState(false);
  const [resetMenu, setResetMenu] = useState(false);
  const [main, setMain] = useState(true);
  const [dificultyMenu, setDificultyMenu] = useState(false);
  const [scoreMenu, setScoreMenu] = useState(false);
  const [instructionsMenu, setIntrusctionsMenu] = useState(false);

  const goToMainMenu = () => {
    setMain(true);
    setDificultyMenu(false);
    setScoreMenu(false);
    setIntrusctionsMenu(false);
  }

  const goToDificultyMenu = () => {
    setMain(false);
    setDificultyMenu(true);
  };

  const goToInstructionsMenu = () => {
    setMain(false);
    setIntrusctionsMenu(true);
  }

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

  const randomBombs = (all) => {
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

  const changeDificulty = (difi) => {
    setDificulty(difi);
  };

  const looseGame = () => {
    setLoose(true);
    setStartTimer(false);
  };

  const resetGame = () => {
    setStartTimer(false);
    setLoose(false);
    setWinner(false);
    setResetMenu(false);
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

  const mainMenu = () => {
    setLoose(false);
    setWinner(false);
    setGameStart(false);
    setGameLoaded(false);
    setStartTimer(false);
    setResetMenu(false);
    setTimeout(() => {
      setTime(0);
    }, 1001);
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
      <div className="game-title" style={{ fontSize: !gameStart ? "16rem" : '4rem'}}>
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
          setResetMenu={setResetMenu}
          resetMenu={resetMenu}
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
          resetMenu={resetMenu}
          winner={winner}
          setWinner={setWinner}
          cellsPerRow={cellsPerRow}
        />
      )}
      {gameStart === false && main && (
        <Menu
          startGame={startGame}
          goToDificultyMenu={goToDificultyMenu}
          goToInstructionsMenu={goToInstructionsMenu}
        />
      )}
      {resetMenu && (
        <ResetMenu
          resetGame={resetGame}
          mainMenu={mainMenu}
          setResetMenu={setResetMenu}
        />
      )}
      {endMenu && <EndMenu loose={loose} setEndMenu={setEndMenu} />}
      {dificultyMenu && <DificultyMenu dificultyApp={dificulty} changeDificulty={changeDificulty} goToMainMenu={goToMainMenu}/>}
      {instructionsMenu && <InstructionsMenu goToMainMenu={goToMainMenu}/>}
      <div className="footer">A game developed by GoncaloBM @ 2020</div>
    </div>
  );
}

export default App;
