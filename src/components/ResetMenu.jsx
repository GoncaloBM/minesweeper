import React, { useRef, useEffect } from "react";
import "./ResetMenu.css";

export const ResetMenu = ({ resetGame, mainMenu, setResetMenu }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResetMenu(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="reset-menu" ref={wrapperRef}>
      <div className="reset-option" onClick={resetGame}>
        Reset Game
      </div>
      <div className="reset-option" onClick={mainMenu}>
        Return to Main Menu
      </div>
    </div>
  );
};
