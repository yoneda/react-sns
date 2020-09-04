import React, { useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
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
  const [note, setNote] = useState({});
  console.log(note);
  return (
    <Box>
      <h2>Days</h2>
      <NewButton>new</NewButton>
      <ListPanel onSelectNote={(note) => setNote(note)} />
      {!isEmpty(note) && <EditPanel title={note.title} body={note.body} />}
    </Box>
  );
}

export default V0;
