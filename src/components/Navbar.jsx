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
            "url(https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/bomb_1f4a3.png)",
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
            ? 'url("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/joypixels/257/grinning-face-with-big-eyes_1f603.png")'
            : 'url("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/joypixels/257/dizzy-face_1f635.png")',
          backgroundColor: "#bdbdbd",
          borderTop: "2px solid white",
          borderLeft: "2px solid white",
          borderRight: "2px solid #707070",
          borderBottom: "2px solid #707070",
        }}
        onClick={resetGame}
      />
      <div className="info">
        <div className="info-number">
          {formatNumber(bombs - flagsRemaining)[0]}
        </div>
        <div className="info-number">
          {formatNumber(bombs - flagsRemaining)[1]}
        </div>
        <div className="info-number">
          {formatNumber(bombs - flagsRemaining)[2]}
        </div>
      </div>
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
