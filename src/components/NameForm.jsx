import React, { useState } from "react";
import axios from "axios";
import "./NameForm.css";

export const NameForm = ({ time, dificulty }) => {
  const [user, setUser] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const changeName = (e) => {
    setUser(e.target.value);
  };

  // https://localhost:3001
  // `http://94.46.171.95/minesweeper/scores`
  const sendTime = () => {
    if (user) {
      setSending(true);
      axios
        .post(`http://94.46.171.95/minesweeper/scores/`, {
          user: user,
          time: time,
          dificulty: dificulty,
        })
        .then((res) => {
          console.log(res);
          setSending(false);
          setSent(true);
        });
    } else {
      alert("Please put some name in field");
    }
  };

  return (
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
              : sending &&
                sent &&
                `url('https://www.yhangry.com/assets/images/checkmark-gif.gif')`,
        }}
      />
    </div>
  );
};
