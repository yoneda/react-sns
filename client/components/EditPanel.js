import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";

const Box = styled.div`
  background: lightgray;
  height: 50px;
  width: 200px;
  margin: 10px;
`;

function EditPanel(props) {
  return (
    <Box>
      <div>Edit panel</div>
    </Box>
  );
}

export default EditPanel;
