import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import TrashedNote from "./TrashedNote";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

function TrashedList() {
  const notes = useStoreState((state) => state.trashed.items);
  const restore = useStoreActions((actions) => actions.trashed.restore);
  const remove = useStoreActions((actions) => actions.trashed.remove);
  const getTrashed = useStoreActions((actions) => actions.trashed.get);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    console.log("component did mount!");
    getTrashed();
  }, []);
  return (
    <Box>
      {notes.map((note, noteIndex) => (
        <TrashedNote
          key={noteIndex}
          title={note.title}
          body={note.body}
          onRestore={() => restore({ id: note.id })}
          onDelete={() => remove({ id: note.id })}
        />
      ))}
    </Box>
  );
}

export default TrashedList;
