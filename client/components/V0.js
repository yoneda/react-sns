import React, { useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import MenuPanel from "./MenuPanel";
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
  const createNote = useStoreActions((actions) => actions.notes.create);
  const [note, setNote] = useState({});
  return (
    <Box>
      <h2>Days</h2>
      <NewButton
        onClick={() =>
          createNote({
            body:"",
            trashed: false,
            onSuccess: () => {},
          })
        }
      >
        new
      </NewButton>
      <MenuPanel />
      <ListPanel onSelectNote={(note) => setNote(note)} />
      {!isEmpty(note) && <EditPanel note={note} />}
    </Box>
  );
}

export default V0;
