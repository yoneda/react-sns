import React, { useState, Fragment } from "react";
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
  position: absolute;
  left: 100;
  top: 100;
  right: 100;
  bottom: 100;
  border: solid 1px lightgray;
  border-radius: 10px;
  padding: 20px;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-flow: column;
  z-index: 2;
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
  const { note, onClose } = props;
  if (note === undefined) {
    return <div>a</div>;
  }
  const updateNotes = useStoreActions((actions) => actions.notes.update);
  const trash = useStoreActions((actions) => actions.notes.trash);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  return (
    <Fragment>
      <BackBox onClick={() => onClose()} />
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
              if (title === note.title && body === note.body) {
                onClose();
              } else {
                updateNotes({
                  id: note.id,
                  title,
                  body,
                  onSuccess: onClose,
                });
              }
            }}
          >
            閉じる
          </button>
          <button onClick={() => trash({ id: note.id, onSuccess: onClose })}>
            ゴミ箱に入れる
          </button>
        </Footer>
      </Box>
    </Fragment>
  );
}

export default Editor;
