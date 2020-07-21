import React, { useState } from "react";
import "./App.css";
import { Board } from "./components/Board.jsx";
import { Menu } from "./components/Menu";

function App() {
  const [dificulty, setDificulty] = useState("Easy");

  const changeDificulty = difi => {
    setDificulty(difi);
  };
  return (
    <div className="App">
      <Board dificulty={dificulty} />
      <Menu changeDificulty={changeDificulty} />
    </div>
  );
}

export default App;

