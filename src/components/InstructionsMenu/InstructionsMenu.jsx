import React, { useState, useEffect } from "react";
import "./InstructionsMenu.css";
import Instruction1 from "../../images/Instructions.png";
import Instruction2 from "../../images/Instructions-1.png";
import Instruction3 from "../../images/Instructions-2.png";
import Instruction4 from "../../images/Instructions-3.png";
import Instruction5 from "../../images/Instructions-4.png";
import Instruction6 from "../../images/Instructions-5.png";
import Instruction7 from "../../images/Instructions-6.png";
import Instruction8 from "../../images/Instructions-7.png";

export const InstructionsMenu = ({goToMainMenu}) => {
  const instructions = [
    {
      text: "This is your playground",
      image: Instruction1,
    },
    {
      text: "Here you have the time you are playing",
      image: Instruction2,
    },
    {
      text: "Remaining flags you have left to place",
      image: Instruction3,
    },
    {
      text:
        "If for some case, you want to reset or return to the main menu, this is the place!",
      image: Instruction4,
    },
    {
      text: "And of course, this is your battlefield! :D",
      image: Instruction5,
    },
    {
      text:
        "When you click a spot and a number appear, that means you have that ammount of bombs near",
      image: Instruction6,
    },
    {
      text:
        "If you think that you spot a bomb, place a flag with the right click so you won't click there and loose. If you want to remove that flag, right click again.",
      image: Instruction7,
    },
    {
      text:
        "The objective is to show all the number and don't click a bomb! Good Luck Mate!",
      image: Instruction8,
    },
  ];
  const [numberInstruction, setNumberInstruction] = useState(0);
  const [instruction, setInstruction] = useState(
    instructions[numberInstruction]
  );

  const nextInstruction = (click) => {
    const number = numberInstruction;
    if (
      (number === instructions.length - 1 && click === 1) ||
      (number === 0 && click === -1)
    ) {
      return;
    } else {
      setNumberInstruction(number + click);
    }
  };

  useEffect(() => {
    setInstruction(instructions[numberInstruction]);
  }, [numberInstruction]);

  return (<>
    <div className="instructions-screen">
        <div className="instruction-title">Instructions</div>
      <div className="instructions-menu">
        <div className="arrow" onClick={() => nextInstruction(-1)}></div>
        <div className="instruction">
          <div
            className="instruction-image"
            style={{ backgroundImage: `url(${instruction.image})` }}
          ></div>
          <div className="instruction-text">{instruction.text}</div>
        </div>
        <div
          className="arrow"
          style={{ transform: "rotate(180deg)" }}
          onClick={() => nextInstruction(1)}
        ></div>
      </div>
    </div>
    <div className="menu-button" onClick={goToMainMenu}>Main Menu</div>
    </>
  );
};
