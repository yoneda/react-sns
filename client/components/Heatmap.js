import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled, { css } from "styled-components";
import dayjs from "dayjs";

const Box = styled.div`
  background: lightgray;
  height: 60px;
  width: 250px;
  margin: 10px;
  padding: 10px;
`;

const CellContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Cell = styled.div`
  background: white;
  border: solid black 1px;
  height: 10px;
  width: 10px;
  margin: 5px;
`;

function Heatmap(props) {
  const notes = useStoreState((state) => state.notes.items);
  const days = [...Array(14)].map((_, count) =>
    dayjs().add(-count, "day").format("YYYY-MM-DD")
  );
  return (
    <Box>
      Heatmap: {notes.length}
      <br />
      <CellContainer>
        {days.map((day, key) => (
          <Cell key={key} />
        ))}
      </CellContainer>
    </Box>
  );
}

export default Heatmap;
