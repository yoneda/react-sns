import React, { Fragment } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../store";
import Login from "../pages/login";
import Signup from "../pages/signup";
import { Router } from "@reach/router";

function App(props) {
  return (
    <Fragment>
      <StoreProvider store={store}>
        <Router>
          <Login path="login" />
          <Signup path="signup" />
        </Router>
      </StoreProvider>
    </Fragment>
  );
}

export default App;
