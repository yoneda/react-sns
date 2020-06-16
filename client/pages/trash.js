import React from "react";
import NoteList2 from "../components/NoteList2";
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
  return (
    <Box>
      <Header>
        <Item>
          <h3>Trash</h3>
        </Item>
        <Blank />
        <Item>
          <button>ゴミ箱を空にする</button>
        </Item>
      </Header>
      <NoteList2 />
    </Box>
  );
}

export default Trash;
