import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import Note2 from "../components/Note2";
import Editor from "../components/Editor";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

function TrashedList2() {
  const notes = useStoreState((state) => state.trashed.items);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <Box>
      {notes.map((note, noteIndex) => (
        <Note2
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

export default TrashedList2;
