import React, { Fragment, useState } from "react";
import { Router } from "@reach/router";
import { StoreProvider, useStoreState } from "easy-peasy";
import store from "../store";
import Login2 from "../pages/login2";
import Signup2 from "../pages/signup2";
import Index from "../pages/index";
import Setting from "../pages/setting";
import Creator from "../components/Creator";
import Setting2 from "../pages/setting2";
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
          <Index path="/" />
          <Setting2 path="/setting" />
          <Home path="/home" />
          <Trash path="/trash" />
        </Router>
      </Layout>
    </Fragment>
  );
}

function NotAuthed() {
  return (
    <Router>
      <Login2 path="/login" />
      <Signup2 path="/signup" />
    </Router>
  );
}

function Render() {
  const isLoggedIn = useStoreState((state) => state.app.isLoggedIn);
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
