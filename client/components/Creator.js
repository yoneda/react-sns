import React, { useState } from "react";
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
`;

function Creater() {
  const [title, setTitle] = useState("my title");
  const [body, setBody] = useState("body body body");
  return (
    <BackBox>
      <Box>
        <div>{title}</div>
        <div>{body}</div>
      </Box>
    </BackBox>
  );
}

export default Creater;
