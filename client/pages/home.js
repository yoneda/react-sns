import React from "react";
import NoteList2 from "../components/NoteList2";
import Editor from "../components/Editor";
import styled from "styled-components";

const Box = styled.div`
  padding: 60px;
`;

const Header = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
`;

const Calendar = styled.div`
  height: 160px;
  background-color: rgba(235, 244, 255, 1);
  border: solid 1px lightgray;
`;

function Home() {
  return (
    <Box>
      <Header>
        <h3>Calendar</h3>
      </Header>
      <Calendar />
      <Header>
        <h3>Timeline</h3>
      </Header>
      <NoteList2 />
    </Box>
  );
}

export default Home;
