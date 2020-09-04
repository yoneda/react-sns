import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";

const Box = styled.div`
  background: lightgray;
  height: 300px;
  width: 200px;
  margin: 10px;
`;

const TextNoWrap = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 150px;
`;


function ListPanel(props) {
  const notes = useStoreState((state) => state.notes.items);
  return (
    <Box>
      <div>ListPanel</div>
      {notes.map((note, index) => (
        <div key={index}>
          <TextNoWrap>{note.title}</TextNoWrap>
          <TextNoWrap>{note.body}</TextNoWrap>
        </div>
      ))}
    </Box>
  );
}

export default ListPanel;
