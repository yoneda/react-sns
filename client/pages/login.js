import React, { useState } from "react";
import LandingWrapper from "../components/LandingWrapper";
import { useStoreState, useStoreActions } from "easy-peasy";
import Router from "next/router";

const Login = (props) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const doLogin = useStoreActions((actions) => actions.app.login);
  const onSuccess = () => Router.push("/");

  return (
    <div>
      <LandingWrapper>
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
      </LandingWrapper>
    </div>
  );
};

export default Login;
