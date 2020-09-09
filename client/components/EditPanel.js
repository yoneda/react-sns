import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";

const Box = styled.div`
  background: lightgray;
  height: 70px;
  width: 200px;
  margin: 10px;
  padding: 10px;
`;

function EditPanel(props) {
  const note = useStoreState((state) => state.notes.focus);
  const setNote = useStoreActions((actions) => actions.notes.setFocus);
  return (
    <Box>
      <div>Edit panel</div>
      <input
        type="text"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <input
        type="text"
        value={note.body}
        onChange={(e) => setNote({ ...note, body: e.target.value })}
      />
    </Box>
  );
}

export default EditPanel;
