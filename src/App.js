import React, { useState } from "react";
import "./App.css";
import { Board } from "./components/Board.jsx";
import { Menu } from "./components/Menu";

function App() {
  const [dificulty, setDificulty] = useState("Easy");
  const [gameStart, setGameStart] = useState(false);

  const changeDificulty = (difi) => {
    setDificulty(difi);
  };

  const startGame = () => {
    setGameStart(true);
  };

  return (
    <div className="App">
      {gameStart === true && <Board dificulty={dificulty} />}
      {gameStart === false && (
        <Menu changeDificulty={changeDificulty} startGame={startGame} dificultyApp ={dificulty}/>
      )}
    </div>
  );
}

export default App;
