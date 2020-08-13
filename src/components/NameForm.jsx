import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NameForm.css";
import { ScoresReceived } from "./scoresReceived/ScoresReceived";

export const NameForm = ({ time, dificulty }) => {
  const [user, setUser] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [scoresFromDB, setScoresFromDB] = useState([]);
  const [scoresToDisplay, setScoresToDisplay] = useState([]);

  const changeName = (e) => {
    setUser(e.target.value);
  };

  // https://localhost:3001
  // `http://94.46.171.95/minesweeper/scores`
  const sendTime = () => {
    if (user) {
      setSending(true);
      axios
        .post(`https://goncalobmira.online/minesweeper/scores/`, {
          user: user,
          time: time,
          dificulty: dificulty,
        })
        .then((res) => {
          console.log(res);
          setSending(false);
          setSent(true);
          setScoresFromDB(res.data);
        });
    } else {
      alert("Please put some name in field");
    }
  };

  const updateScores = () => {
    let currentId = "";

    for (let i = 0; i < scoresFromDB.length; i++) {
      if (!currentId) {
        currentId = scoresFromDB[i];
      } else {
        if (currentId.id < scoresFromDB[i].id) {
          currentId = scoresFromDB[i];
        }
      }
    }

    let scores = [];

    for (let j = 0; j < scoresFromDB.length; j++) {
      if (scoresFromDB[j] === currentId) {
        scores = [scoresFromDB[j - 1], scoresFromDB[j], scoresFromDB[j + 1]];
      }
    }

    setScoresToDisplay(scores);
  };

  useEffect(() => {
    updateScores();
  }, [scoresFromDB]);

  return (
    <>
      {!sent && (
        <div className="form">
          <input
            className="name-to-send"
            onChange={changeName}
            placeholder="Your name here..."
          />
          <div
            className="sending-button"
            onClick={sendTime}
            style={{
              backgroundImage:
                !sending && !sent
                  ? `url('https://cdn4.iconfinder.com/data/icons/materia-social-free/24/038_028_share_link_friends_send_android_material-512.png')`
                  : sending && !sent
                  ? `url('https://www.simplificpavarini.com.br/006/images/loading3.gif')`
                  : !sending &&
                    sent &&
                    `url('https://www.yhangry.com/assets/images/checkmark-gif.gif')`,
            }}
          />
        </div>
      )}
      {sent && <ScoresReceived scoresToDisplay={scoresToDisplay} />}
    </>
  );
};
