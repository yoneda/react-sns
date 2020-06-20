import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
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
  const { onClose } = props;
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
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
          onChange={(e) => setBody(e.target.nodeValue)}
        />
        <Footer>
          <button onClick={() => onClose()}>閉じる</button>
          <button>ゴミ箱に入れる</button>
        </Footer>
      </Box>
    </BackBox>
  );
}

export default Editor;
