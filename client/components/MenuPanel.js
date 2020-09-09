import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link, navigate } from "@reach/router";
import styled, { css } from "styled-components";

const Box = styled.div`
  background: lightgray;
  height: 50px;
  width: 200px;
  margin: 10px;
  padding: 10px;
`;

const PopupBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

function Popup() {
  const logout = useStoreActions((actions) => actions.app.logout);
  return (
    <PopupBox>
      <button onClick={() => logout({ onSuccess: () => navigate("/login") })}>
        logout
      </button>
    </PopupBox>
  );
}

function MenuPanel(props) {
  const [isPopuped, updateIsPopuped] = useState(false);
  return (
    <Box>
      <div>MenuPanel</div>
      <button onClick={() => updateIsPopuped(!isPopuped)}>kohei</button>
      {isPopuped && <Popup />}
    </Box>
  );
}

export default MenuPanel;
