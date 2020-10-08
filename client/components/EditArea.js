import React from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Input = styled.input`
  width: 200px;
  box-sizing: border-box;
  border: none;
  background-color: white;
  color: gray;
  font-size: 15px;
  font-weight: lighter;
  outline: none;
  &:focus{
    background-color: whitesmoke;
  }
`;

const TextArea = styled.textarea`
  width: 200px;
  height: 80px;
  box-sizing: border-box;
  border: none;
  background-color: white;
  color: gray;
  font-size: 15px;
  outline: none;
  resize: none;
  overflow: hidden;
  &:focus{
    background-color: whitesmoke;
  }
`;

function EditArea() {
  const note = useStoreState((state) => state.notes.focus);
  const setNote = useStoreActions((actions) => actions.notes.setFocus);
  return (
    <div>
      <Input
        type="text"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <TextArea
        value={note.body}
        onChange={(e) => setNote({ ...note, body: e.target.value })}
      />
    </div>
  );
}

export default EditArea;