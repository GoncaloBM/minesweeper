import React from "react";
import { formatNumber } from "../functions/formatNumber";
import "./Navbar.css";

export const Navbar = ({ loose, resetGame, flagsRemaining, bombs, time }) => {
  const navbarStyle = {
    display: "flex",
    alignItems: "center",
    height: "15%",
  };

  return (
    <div className="navbar" style={navbarStyle}>
      <div
        className="info-image"
        style={{
          backgroundImage:
            "url(https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/9194672661559033162-512.png)",
        }}
      />
      <div className="info">
        <div className="info-number">{formatNumber(time)[0]}</div>
        <div className="info-number">{formatNumber(time)[1]}</div>
        <div className="info-number">{formatNumber(time)[2]}</div>
      </div>
      <div
        className="reset"
        style={{
          backgroundImage: !loose
            ? 'url("https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/8122551761583400157-512.png")'
            : 'url("https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/8478740681583400158-512.png")',
        }}
        onClick={resetGame}
      />
      <div className="info">{formatNumber(bombs - flagsRemaining)}</div>
      <div
        className="info-image"
        style={{
          backgroundImage:
            "url(https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/15574596561537355607-512.png)",
        }}
      />
    </div>
  );
};
