import React from "react";
import { formatNumber } from "../functions/formatNumber";
import "./Navbar.css";

export const Navbar = ({
  loose,
  flagsRemaining,
  bombs,
  time,
  setResetMenu,
  flagChosen,
  setFlagChosen,
}) => {
  const navbarStyle = {
    display: "flex",
    alignItems: "center",
    height: "10vh",
  };

  return (
    <div className="navbar" style={navbarStyle}>
      <div className="info-image" />
      <div
        className="info"
        style={{ width: window.innerWidth < 500 ? "20%" : "10%" }}
      >
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
        }}
        onClick={() => {
          setResetMenu(true);
        }}
      />
      <div
        className="info"
        style={{ width: window.innerWidth < 500 ? "20%" : "10%" }}
      >
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
          border: flagChosen && "1px solid black",
        }}
        onClick={() => setFlagChosen(!flagChosen)}
      />
    </div>
  );
};
