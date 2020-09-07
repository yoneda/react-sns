import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled, { css } from "styled-components";

const Box = styled.div`
  background: lightgray;
  height: 50px;
  width: 200px;
  margin: 10px;
  padding: 10px;
`;

function MenuPanel(props) {
  return (
    <Box>
      <div>MenuPanel</div>
    </Box>
  );
}

export default MenuPanel;
