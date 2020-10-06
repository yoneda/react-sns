import React from "react";
import styled from "styled-components";
import Pen from "./icons/Pen";

const Box = styled.div`
  background: whitesmoke;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function EmptyPanel(props) {
  return (
    <Box>
      <Pen />
    </Box>
  );
}
export default EmptyPanel;
