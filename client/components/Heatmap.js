import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled, { css } from "styled-components";

const Box = styled.div`
  background: lightgray;
  height: 20px;
  width: 200px;
  margin: 10px;
  padding: 10px;
`;

function Heatmap(props) {
  const notes = useStoreState((state) => state.notes.items);
  return <Box>Heatmap: {notes.length}</Box>;
}

export default Heatmap;
