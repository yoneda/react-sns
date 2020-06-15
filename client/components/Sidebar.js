import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";

const Box = styled.div`
  width: 240px;
  height: 100%;
  background-color: red;
`;

const BoxItem = styled.div`
`;

function Popup() {
  return <button>logout</button>;
}

function Sidebar() {
  const [isPopuped, updateIsPopuped] = useState(false);
  const index = useStoreState((state) => state.app.indexSidebar);
  const updateIndex = useStoreActions((actions) => actions.app.updateIndex);
  return (
    <Box>
      <button onClick={() => updateIsPopuped(!isPopuped)}>kohei</button>
      <button onClick={() => updateIndex(0)}>home</button>
      <button onClick={() => updateIndex(1)}>setting</button>
      <button onClick={() => updateIndex(2)}>trash</button>
      <br />
      {isPopuped && <Popup />}
    </Box>
  );
}

export default Sidebar;
