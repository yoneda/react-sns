import React from "react";
import styled from "styled-components";
import Editor from "./Editor";

const Box = styled.div`
  height: 200px;
  width: 250px;
  border: 2px gray solid;
  box-sizing: border-box;
  background: white;
`;

function EditPane() {
  return (
    <Box>
      <Editor />
    </Box>
  );
}

export default EditPane;
