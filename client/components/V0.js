import React from "react";
import styled from "styled-components";
import ListPanel from "./ListPanel";
import EditPanel from "./EditPanel";

const Box = styled.div`
  width: 200px;
  height: 200px;
`;

const NewButton = styled.button`
  margin: 10px;
`;

function V0(props) {
  return (
    <Box>
      <h2>Days</h2>
      <NewButton>new</NewButton>
      <ListPanel />
      <EditPanel />
    </Box>
  );
}

export default V0;
