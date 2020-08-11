import React, { useState } from "react";
import { NameForm } from "./NameForm";
import "./EndMenu.css";

export const EndMenu = ({ loose, setEndMenu, dificulty, time }) => {
  const [formToDB, setFormToDB] = useState(false);

  return (
    <div
      className="end-menu"
      style={{
        backgroundImage:
          !loose &&
          `url('https://data.whicdn.com/images/311854596/original.gif')`,
        padding: !formToDB ? "2rem 1rem 4rem 1rem" : "2rem 1rem 7rem 1rem",
        width: window.innerWidth < 500 ? "85%" : "50%",
      }}
    >
      <div
        className="text"
        style={{ fontSize: window.innerWidth < 500 ? "1.5rem" : "2.5rem" }}
      >
        {loose ? "You Loose :(" : "You Win! Congratulations"}
      </div>
      <div className="buttons">
        <div
          className="end-button"
          onClick={() => setEndMenu(false)}
          style={{ fontSize: window.innerWidth < 500 ? "1rem" : "1.5rem" }}
        >
          Try Again
        </div>
        {!loose && (
          <div
            className="end-button"
            onClick={() => setFormToDB(!formToDB)}
            style={{ fontSize: window.innerWidth < 500 ? "1rem" : "1.5rem" }}
          >
            Submit your Time
          </div>
        )}
      </div>
      {formToDB && <NameForm time={time} dificulty={dificulty} />}
    </div>
  );
};
