import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Note from "../components/Note";
import Editor from "./Editor";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

function NoteList() {
  const notes = useStoreState((state) => state.notes.items);
  const getNotes = useStoreActions((actions) => actions.notes.get);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <Box>
      {notes.map((note, noteIndex) => (
        <Note
          key={noteIndex}
          title={note.title}
          body={note.body}
          onEdit={() => {
            setOpen(true);
            setIndex(noteIndex);
          }}
        />
      ))}
      {open && (
        <Editor
          note={notes[index]}
          onClose={() => {
            setOpen(false);
            setIndex(0);
          }}
        />
      )}
    </Box>
  );
}

export default NoteList;
