import React from "react";
import styled from "styled-components";
import CellTable from "./CellTable";

const Box = styled.div`
  width: 250px;
  height: 100px;
  border: 2px solid gray;
  box-sizing: border-box;
`;

function Heatmap() {
  return (
    <Box>
      <CellTable />
    </Box>
  );
}

export default Heatmap;
