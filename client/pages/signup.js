import React, { useState } from "react";
import LandingWrapper from "../components/LandingWrapper";

const Signup = (props) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [account, setAccount] = useState("");

  return (
    <div>
      <LandingWrapper>
        <h3>signup:</h3>
        <input
          type="text"
          onChange={(e) => setMail(e.target.value)}
          value={mail}
          placeholder="mail"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          placeholder="pass"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setAccount(e.target.value)}
          value={account}
          placeholder="account"
        />
        <br />
        <button onClick={() => {}}>send</button>
      </LandingWrapper>
    </div>
  );
};

export default Signup;
