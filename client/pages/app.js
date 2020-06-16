import React from "react";
import { Router } from "@reach/router";
import { StoreProvider } from "easy-peasy";
import store from "../store";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Index from "../pages/index";
import Setting from "../pages/setting";
import Home from "../pages/home";
import Trash from "../pages/trash";
import Sidebar from "../components/Sidebar";
import { Reset } from "styled-reset";
import styled from "styled-components";

const Box = styled.div`
  height: 100%;
`;

const Layout = styled.div`
  display: flex;
  height: 100%;
`;

function App() {
  return (
    <Box>
      <Reset />
      <StoreProvider store={store}>
        <Layout>
          <Sidebar />
          <Router>
            <Index path="/" />
            <Login path="/login" />
            <Signup path="/signup" />
            <Setting path="/setting" />
            <Home path="/home" />
            <Trash path="/trash" />
          </Router>
        </Layout>
      </StoreProvider>
    </Box>
  );
}

export default App;
