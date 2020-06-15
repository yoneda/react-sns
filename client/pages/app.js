import React, { Fragment } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../store";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Index from "../pages/index";
import Setting from "../pages/setting";
import Home from "../pages/home";
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
          <Home path="/home" />
        </Router>
      </StoreProvider>
    </Fragment>
  );
}

export default App;
