import React, { Fragment } from "react";
import { useStoreState } from "easy-peasy";
import styled from "styled-components";
import NoteList from "../components/NoteList";

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
  const user = useStoreState((state) => state.app.user);
  return (
    <Box>
      {user.showCalendar === 1 && (
        <Fragment>
          <Header>
            <h3>Calendar</h3>
          </Header>
          <Calendar />
        </Fragment>
      )}
      <Header>
        <h3>Timeline</h3>
      </Header>
      <NoteList />
    </Box>
  );
}

export default Home;
