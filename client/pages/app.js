import React from "react";
import { Router } from "@reach/router";
import { StoreProvider } from "easy-peasy";
import store from "../store";
import Login2 from "../pages/login2";
import Signup2 from "../pages/signup2";
import Index from "../pages/index";
import Setting from "../pages/setting";
import Setting2 from "../pages/setting2";
import Home from "../pages/home";
import Trash from "../pages/trash";
import Sidebar from "../components/Sidebar";
import { Reset } from "styled-reset";
import Creator from "../components/Creator";
import styled from "styled-components";

const Box = styled.div`
  height: 100%;
`;

const Layout = styled.div`
  margin-left: 240px;
`;

function App() {
  return (
    <Box>
      <Creator />
      <Reset />
      <StoreProvider store={store}>
        <Sidebar />
        <Layout>
          <Router>
            <Index path="/" />
            <Setting2 path="/setting" />
            <Home path="/home" />
            <Trash path="/trash" />
          </Router>
        </Layout>
      </StoreProvider>
    </Box>
  );
}

function App2() {
  return (
    <Box>
      <Reset />
      <StoreProvider store={store}>
        <Router>
          <Login2 path="/login" />
          <Signup2 path="/signup" />
        </Router>
      </StoreProvider>
    </Box>
  );
}

export default App;
