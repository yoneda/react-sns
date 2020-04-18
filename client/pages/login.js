import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { redirectTo } from "@reach/router";
import LandingHeader from "../components/LandingHeader";

const Login = (props) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const doLogin = useStoreActions((actions) => actions.app.login);
  const onSuccess = () => redirectTo("/");

  return (
    <div>
      <LandingHeader />
      <h3>login:</h3>
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
      <button onClick={() => doLogin({ mail, pass, onSuccess })}>send</button>
    </div>
  );
};

export default Login;
