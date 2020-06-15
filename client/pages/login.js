import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { navigate } from "@reach/router";
import LandingHeader from "../components/LandingHeader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const doLogin = useStoreActions((actions) => actions.app.login);
  const onSuccess = () => navigate("/");

  return (
    <div>
      <LandingHeader />
      <h3>login:</h3>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="email"
      />
      <br />
      <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="password"
      />
      <br />
      <button onClick={() => doLogin({ email, password, onSuccess })}>send</button>
    </div>
  );
}

export default Login;
