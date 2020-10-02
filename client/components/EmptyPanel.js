import React from "react";
import styled from "styled-components";
import PenIcon from "./PenIcon";

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
      <PenIcon />
    </Box>
  );
}
export default EmptyPanel;
