import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled, { css } from "styled-components";

const Box = styled.div`
  border: solid 1px darkgray;
  height: 100%;
  box-sizing: border-box;
`;

const TextNoWrap = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 150px;
`;

const NoteBox = styled.div`
  background: white;
  padding: 20px;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      background: skyblue;
    `}
`;

const NoteListBox = styled.div`
  overflow: scroll;
  height: 100%;
`;

const NoteTitle = styled.div`
  font-size: 15px;
`;

const NoteBody = styled.div`
  font-size: 12px;
  color: dimgray;
  height: 30px;
`;

function Note(props) {
  const { title, body, createdAt, selected, onClick } = props;
  return (
    <NoteBox onClick={() => onClick()} selected={selected}>
      <NoteTitle>{title ? <div>{title}</div> : <br />}</NoteTitle>
      <NoteBody>{body ? <div>{body}</div> : <br />}</NoteBody>
    </NoteBox>
  );
}

function ListPanel(props) {
  const { notes, index, setFocus } = props;
  return (
    <Box>
      <NoteListBox>
        {notes.map((note, noteIndex) => (
          <Note
            key={noteIndex}
            title={note.title}
            body={note.body}
            createdAt={note.createdAt}
            selected={noteIndex === index}
            onClick={() => {
              setFocus(note);
            }}
          />
        ))}
      </NoteListBox>
    </Box>
  );
}

const ListPanelInjected = function () {
  const notes = useStoreState((state) => state.notes.items);
  const index = useStoreState((state) => state.notes.index);
  const setFocus = useStoreActions((actions) => actions.notes.setFocus);
  return <ListPanel {...{ notes, index, setFocus }} />;
};

export { ListPanel, ListPanelInjected as default };
