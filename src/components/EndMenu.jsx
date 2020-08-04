import React, { useState } from "react";
import { NameForm } from "./NameForm";
import "./EndMenu.css";

export const EndMenu = ({ loose, setEndMenu }) => {
  const [formToDB, setFormToDB] = useState(false);

  return (
    <div
      className="end-menu"
      style={{
        backgroundImage:
          !loose &&
          `url('https://data.whicdn.com/images/311854596/original.gif')`,
        padding: !formToDB ? "2rem 1rem 4rem 1rem" : "2rem 1rem 7rem 1rem"
      }}
    >
      <div className="text">
        {loose ? "You Loose :(" : "You Win! Congratulations"}
      </div>
      <div className="buttons">
        <div className="end-button" onClick={() => setEndMenu(false)}>
          Try Again
        </div>
        {!loose && <div className="end-button" onClick={() => setFormToDB(!formToDB)}>
          Submit your Time
        </div>}
      </div>
      {formToDB && <NameForm />}
    </div>
  );
};
