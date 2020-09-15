import React, { useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import MenuPanel from "./MenuPanel";
import ListPanel from "./ListPanel";
import EditPanel from "./EditPanel";
import Heatmap from "./Heatmap";

const Box = styled.div`
  width: 200px;
  height: 200px;
`;

const NewButton = styled.button`
  margin: 10px;
`;

function V0(props) {
  const notes = useStoreState((state) => state.notes.items);
  const focus = useStoreState((state) => state.notes.focus);
  const createNote = useStoreActions((actions) => actions.notes.create);
  return (
    <Box>
      <h2>Days</h2>
      <NewButton
        onClick={() =>
          createNote({
            body: "",
            trashed: false,
            onSuccess: () => {},
          })
        }
      >
        new
      </NewButton>
      <Heatmap />
      {notes.map((note, key) => (
        <div key={key}>{note.createdAt}</div>
      ))}
      <MenuPanel />
      <ListPanel />
      {!isEmpty(focus) && <EditPanel />}
    </Box>
  );
}

export default V0;
