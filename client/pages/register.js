import React, { useState } from "react";

const Register = props => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [account, setAccount] = useState("");

  return (
    <div>
      <h3>register:</h3>
      <input
        type="text"
        onChange={e => setMail(e.target.value)}
        value={mail}
        placeholder="mail"
      />
      <br />
      <input
        type="text"
        onChange={e => setPass(e.target.value)}
        value={pass}
        placeholder="pass"
      />
      <br />
      <input
        type="text"
        onChange={e => setAccount(e.target.value)}
        value={account}
        placeholder="account"
      />
      <br />
      <button onClick={() => {}}>send</button>
    </div>
  );
};

export default Register;
