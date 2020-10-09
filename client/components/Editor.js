import React, { useState, useCallback } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";
import DotCircle from "./icons/DotCircle";
import Pencil from "./icons/Pencil";
import EditArea from "./EditArea";
import EditPopup from "./EditPopup";

const Box = styled.div`
  width: 200px;
  height: 180px;
  display: grid;
  grid-template-columns: 1fr 60px;
  grid-template-rows: 30px 1fr;
  grid-template-areas:
    ". menu"
    "main main";
`;

const Menu = styled.div`
  grid-area: menu;
  display: flex;
  flex-flow: row wrap;
`;

const Main = styled.div`
  grid-area: main;
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  color: gray;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
  &:active {
    background-color: gainsboro;
  }
`;

function Editor() {
  const note = useStoreState((state) => state.notes.focus);
  const updateNote = useStoreActions((actions) => actions.notes.update);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({});
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();
      setPos({ x: rect.x, y: rect.y });
    }
  }, []);
  return (
    <Box>
      <Menu>
        <Icon onClick={() => updateNote({ ...note })}>
          <Pencil />
        </Icon>
        <Icon ref={measuredRef} onClick={() => setOpen(true)}>
          <DotCircle />
        </Icon>
      </Menu>
      <Main>
        <EditArea />
      </Main>
      {open && (
        <EditPopup
          position={{ x: pos.x, y: pos.y + 30 }}
          onClose={() => setOpen(false)}
        />
      )}
    </Box>
  );
}

export default Editor;
