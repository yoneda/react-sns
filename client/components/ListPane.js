import React  from "react";
import styled from "styled-components";
import NoteList from "./NoteList";

const Box = styled.div`
  height: 200px;
  width: 250px;
  border: 2px gray solid;
  box-sizing: border-box;
`;

function ListPane() {
  return (
    <Box>
      <NoteList />
    </Box>
  );
}

export default ListPane;
