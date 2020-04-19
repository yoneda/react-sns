import React, { Fragment, useState } from "react";
import LandingHeader from "../components/LandingHeader";

function Signup(){
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [account, setAccount] = useState("");

  return (
    <Fragment>
      <LandingHeader />
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
    </Fragment>
  );
};

export default Signup;
