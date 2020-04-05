import React, { useState } from "react";

const Register = props => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div>
      <h3>login:</h3>
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
      <button onClick={() => {}}>send</button>
    </div>
  );
};

export default Register;
