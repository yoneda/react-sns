import React from "react";
import TrashedList2 from "../components/TrashedList2";
import { useStoreActions } from "easy-peasy";
import styled from "styled-components";

const Box = styled.div`
  padding: 60px;
`;

const Header = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
`;

const Item = styled.div`
  flex-grow: 0;
`;

const Blank = styled.div`
  flex-grow: 1;
`;

function Trash() {
  const tidyGarbage = useStoreActions((actions) => actions.trashed.tidyGarbage);
  return (
    <Box>
      <Header>
        <Item>
          <h3>Trash</h3>
        </Item>
        <Blank />
        <Item>
          <button onClick={() => tidyGarbage()}>ゴミ箱を空にする</button>
        </Item>
      </Header>
      <TrashedList2 />
    </Box>
  );
}

export default Trash;
