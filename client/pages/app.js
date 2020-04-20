import React, { Fragment } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../store";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Index from "../pages/index";
import Setting from "../pages/setting";
import { Router } from "@reach/router";

function App() {
  return (
    <Fragment>
      <StoreProvider store={store}>
        <Router>
          <Index path="/" />
          <Login path="/login" />
          <Signup path="/signup" />
          <Setting path="/setting" />
        </Router>
      </StoreProvider>
    </Fragment>
  );
}

export default App;
