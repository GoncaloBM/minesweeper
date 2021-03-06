import React, { useState, useEffect } from "react";
import "./App.css";
import { Board } from "./components/board/Board.jsx";
import { Menu } from "./components/menus/main/Menu";
import { Navbar } from "./components/navbar/Navbar";
import { EndMenu } from "./components/menus/end/EndMenu";
import { ResetMenu } from "./components/menus/reset/ResetMenu";
import { DificultyMenu } from "./components/menus/difficulty/DificultyMenu";
import { InstructionsMenu } from "./components/InstructionsMenu/InstructionsMenu";
import { ScoreMenu } from "./components/ScoreMenu/ScoreMenu";
import { selectAudio, bombAudio, startAudio } from "./components/audios";
import SoundIcon from "./images/sound.png";
import MuteIcon from "./images/mute.png";

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
  const [flagChosen, setFlagChosen] = useState(false);
  const [cellsToWin, setCellsToWin] = useState(rows * cellsPerRow);
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState(0);
  const [endMenu, setEndMenu] = useState(false);
  const [resetMenu, setResetMenu] = useState(false);
  const [main, setMain] = useState(true);
  const [dificultyMenu, setDificultyMenu] = useState(false);
  const [scoreMenu, setScoreMenu] = useState(false);
  const [instructionsMenu, setIntrusctionsMenu] = useState(false);
  const [sound, setSound] = useState(true);

  const goToMainMenu = () => {
    sound && selectAudio.play();
    setMain(true);
    setDificultyMenu(false);
    setScoreMenu(false);
    setIntrusctionsMenu(false);
  };

  const goToDificultyMenu = () => {
    sound && selectAudio.play();
    setMain(false);
    setDificultyMenu(true);
  };

  const goToInstructionsMenu = () => {
    sound && selectAudio.play();
    setMain(false);
    setIntrusctionsMenu(true);
  };

  const goToScores = () => {
    sound && selectAudio.play();
    setMain(false);
    setScoreMenu(true);
  };

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
    sound && bombAudio.play();
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
    sound && startAudio.play();
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
      <div
        className="sound-icon"
        onClick={() => setSound(!sound)}
        style={{
          backgroundImage: sound ? `url(${SoundIcon})` : `url(${MuteIcon})`,
        }}
      ></div>
      <div
        className="game-title"
        style={{
          fontSize:
            gameStart ||
            instructionsMenu ||
            scoreMenu ||
            window.innerWidth < 500
              ? "3rem"
              : "12rem",
        }}
      >
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
          flagChosen={flagChosen}
          setFlagChosen={setFlagChosen}
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
          sound={sound}
          flagChosen={flagChosen}
        />
      )}
      {gameStart === false && main && (
        <Menu
          startGame={startGame}
          goToDificultyMenu={goToDificultyMenu}
          goToInstructionsMenu={goToInstructionsMenu}
          goToScores={goToScores}
        />
      )}
      {resetMenu && (
        <ResetMenu
          resetGame={resetGame}
          mainMenu={mainMenu}
          setResetMenu={setResetMenu}
        />
      )}
      {endMenu && (
        <EndMenu
          loose={loose}
          setEndMenu={setEndMenu}
          dificulty={dificulty}
          time={time}
        />
      )}
      {dificultyMenu && (
        <DificultyMenu
          dificultyApp={dificulty}
          changeDificulty={changeDificulty}
          goToMainMenu={goToMainMenu}
        />
      )}
      {instructionsMenu && <InstructionsMenu goToMainMenu={goToMainMenu} />}
      {scoreMenu && (
        <ScoreMenu goToMainMenu={goToMainMenu} dificulty={dificulty} />
      )}
      <div className="footer">A game developed by GoncaloBM @ 2020</div>
    </div>
  );
}

export default App;
