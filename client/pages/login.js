import React, { useState } from "react";
import { Button } from "@material-ui/core";

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
      <br />
      <Button variant="contained" color="primary">
        Hello, World
      </Button>
    </div>
  );
};

export default Register;
