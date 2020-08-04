import React, { useState } from "react";
import "./NameForm.css";

export const NameForm = () => {
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const changeName = e => {
    setName(e.target.value);
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
        style={{
          backgroundImage:
            !sending && !sent
              ? `url('https://cdn4.iconfinder.com/data/icons/materia-social-free/24/038_028_share_link_friends_send_android_material-512.png')`
              : sending && !sent
              ? `url('https://www.simplificpavarini.com.br/006/images/loading3.gif')`
              : sending &&
                sent &&
                `url('https://www.yhangry.com/assets/images/checkmark-gif.gif')`
        }}
      />
    </div>
  );
};
