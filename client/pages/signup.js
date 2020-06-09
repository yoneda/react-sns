import React, { Fragment, useState } from "react";
import { useStoreActions } from "easy-peasy";
import { navigate } from "@reach/router";
import LandingHeader from "../components/LandingHeader";

function Signup() {
  const createUser = useStoreActions((actions) => actions.app.signup);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSuccess = () => navigate("/");

  return (
    <Fragment>
      <LandingHeader />
      <h3>signup:</h3>
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
      <button onClick={() => createUser({ email, password, onSuccess })}>
        send
      </button>
    </Fragment>
  );
}

export default Signup;
