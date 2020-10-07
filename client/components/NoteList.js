import React, { Fragment } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";
import Note from "./Note";

const NoteListBox = styled.div`
  overflow: scroll;
  width: 200px;
  height: 150px;
`;

function NoteList() {
  const notes = useStoreState((state) => state.notes.items);
  const index = useStoreState((state) => state.notes.index);
  const setFocus = useStoreActions((actions) => actions.notes.setFocus);
  return (
    <Fragment>
      <NoteListBox>
        {notes.map((note, noteIndex) => (
          <Note
            key={noteIndex}
            title={note.title}
            body={note.body}
            selected={noteIndex === index}
            onClick={() => {
              setFocus(note);
            }}
          />
        ))}
      </NoteListBox>
    </Fragment>
  );
}

export default NoteList;
