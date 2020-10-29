import React, { Fragment, useEffect } from "react";
import { StoreProvider, useStoreState, useStoreActions } from "easy-peasy";
import { Router } from "@reach/router";
import { Reset } from "styled-reset";
import store from "../store";
import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";

function Authed() {
  return (
    <Fragment>
      <Router>
        <Login path="/login" />
        <Signup path="/signup" />
        <Main path="/" />
      </Router>
    </Fragment>
  );
}

function NotAuthed() {
  return (
    <Router>
      <Login path="/login" />
      <Signup path="/signup" />
    </Router>
  );
}

function Render() {
  const revisit = useStoreActions((actions) => actions.app.revisit);
  const isLoggedIn = useStoreState((state) => state.app.isLoggedIn);
  useEffect(() => {
    revisit();
  }, []);
  return <Authed />;
}

function App() {
  return (
    <Fragment>
      <Reset />
      <StoreProvider store={store}>
        <Render />
      </StoreProvider>
    </Fragment>
  );
}

export default App;
