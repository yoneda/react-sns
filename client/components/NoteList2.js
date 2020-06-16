import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Note2 from "../components/Note2";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

function NoteList2() {
  const notes = useStoreState((state) => state.notes.items);
  return (
    <Box>
      {notes.map((note, index) => (
        <Note2 key={index} title={note.title} body={note.body} />
      ))}
    </Box>
  );
}

export default NoteList2;
