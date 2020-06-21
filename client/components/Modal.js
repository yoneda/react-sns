import React from "react";
import styled from "styled-components";

const BackBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  border: solid 1px lightgray;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-flow: column wrap;
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

function Modal(props) {
  const { children, onClose } = props;
  return (
    <BackBox>
      <Box>
        {children}
        <Footer>
          <button onClick={() => onClose()}>閉じる</button>
        </Footer>
      </Box>
    </BackBox>
  );
}

export default Modal;
