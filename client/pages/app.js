import React, { Fragment, useState, useEffect } from "react";
import { Router } from "@reach/router";
import { StoreProvider, useStoreState, useStoreActions } from "easy-peasy";
import store from "../store";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Setting from "../pages/setting";
import Creator from "../components/Creator";
import Home from "../pages/home";
import Trash from "../pages/trash";
import Sidebar from "../components/Sidebar";
import { Reset } from "styled-reset";
import styled from "styled-components";

const Box = styled.div`
  height: 100%;
`;

const Layout = styled.div`
  margin-left: 240px;
`;

function Authed() {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      {open && <Creator onClose={() => setOpen(false)} />}
      <Sidebar onClickAdd={() => setOpen(true)} />
      <Layout>
        <Router>
          <Setting path="/setting" />
          <Home path="/" />
          <Trash path="/trash" />
        </Router>
      </Layout>
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
  if (isLoggedIn === true) {
    return <Authed />;
  } else {
    return <NotAuthed />;
  }
}

function App() {
  return (
    <Box>
      <Reset />
      <StoreProvider store={store}>
        <Render />
      </StoreProvider>
    </Box>
  );
}

export default App;
