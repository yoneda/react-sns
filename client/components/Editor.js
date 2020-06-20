import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";

const BackBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const Box = styled.div`
  margin: 100px 100px 100px 100px;
  border: solid 1px lightgray;
  border-radius: 10px;
  padding: 20px;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-flow: column;
`;

const Input = styled.input`
  border-style: none;
  outline: none;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  border-style: none;
  outline: none;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

function Editor(props) {
  const { note, onClose, onTrash } = props;
  const updateNotes = useStoreActions((actions) => actions.notes.update);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  return (
    <BackBox>
      <Box>
        <Input
          placeholder="タイトル"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="内容"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Footer>
          <button
            onClick={() => {
              onClose();
              updateNotes({
                id: note.id,
                title,
                body,
                onSuccess: onClose,
              });
            }}
          >
            閉じる
          </button>
          <button onClick={() => onTrash()}>ゴミ箱に入れる</button>
        </Footer>
      </Box>
    </BackBox>
  );
}

export default Editor;
