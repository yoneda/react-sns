import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";

const Box = styled.div`
  background: lightgray;
  height: 110px;
  width: 200px;
  margin: 10px;
  padding: 10px;
`;

function EditPanel(props) {
  const note = useStoreState((state) => state.notes.focus);
  const setNote = useStoreActions((actions) => actions.notes.setFocus);
  const removeNote = useStoreActions((actions) => actions.notes.remove);
  const updateNote = useStoreActions((actions) => actions.notes.update);
  console.log(note);
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
      <br />
      <button
        onClick={(e) => {
          updateNote({
            id: note.id,
            title: note.title,
            body: note.body,
            onSuccess: () => {},
          });
        }}
      >
        修正
      </button>
      <br />
      <button
        onClick={(e) => {
          removeNote({ id: note.id, onSuccess: () => {} });
          setNote({});
        }}
      >
        削除
      </button>
    </Box>
  );
}

export default EditPanel;
