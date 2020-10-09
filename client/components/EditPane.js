import React from "react";
import styled from "styled-components";
import { useStoreState } from "easy-peasy";
import Editor from "./Editor";
import Empty from "./Empty";
import { isEmpty } from "lodash";

const Box = styled.div`
  height: 200px;
  width: 250px;
  border: 2px gray solid;
  box-sizing: border-box;
  background: white;
`;

function EditPane() {
  const focus = useStoreState((state) => state.notes.focus);
  return <Box>{isEmpty(focus) ? <Empty /> : <Editor />}</Box>;
}

export default EditPane;
