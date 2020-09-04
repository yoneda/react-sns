import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
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
  const notes = useStoreState((state) => state.notes.items);
  return (
    <Box>
      <h2>Days</h2>
      <NewButton>new</NewButton>
      <ListPanel />
      <EditPanel title={"タイトル"} body={"内容"} />
    </Box>
  );
}

export default V0;
