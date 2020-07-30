import React, { useState, useEffect } from "react";
import "./Navbar.css";

export const Navbar = ({ loose, resetGame }) => {
  return (
    <div className="navbar">
      <div className="counter" />
      <div
        className="reset"
        style={{
          backgroundImage: !loose
            ? 'url("https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/8122551761583400157-512.png")'
            : 'url("https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/8478740681583400158-512.png")'
        }}
        onClick={resetGame}
      />
      <div className="bombs" />
    </div>
  );
};
