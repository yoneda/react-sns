import React from "react";
import styled from "styled-components";
import Pen from "./icons/Pen";

const Box = styled.div`
  width: 100%;
  height: 100%;
  background: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Empty(props) {
  return (
    <Box>
      <Pen />
    </Box>
  );
}
export default Empty;
