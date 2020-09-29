import React, { Fragment, useEffect } from "react";
import { StoreProvider, useStoreState, useStoreActions } from "easy-peasy";
import { Router } from "@reach/router";
import { Reset } from "styled-reset";
import styled from "styled-components";
import store from "../store";
import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";

const Box = styled.div`
  height: 100%;
`;

const Draggable = styled.div`
  border-bottom: 1px solid lightgray;
  height: 40px;
  width: 100%;
  -webkit-app-region: drag;
`;

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
    <Box>
      <Reset />
      <Draggable />
      <StoreProvider store={store}>
        <Render />
      </StoreProvider>
    </Box>
  );
}

export default App;
