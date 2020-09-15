import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled, { css } from "styled-components";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const Box = styled.div`
  background: lightgray;
  height: 100px;
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

  ${(props) =>
    props.light &&
    css`
      background: skyblue;
    `}
`;

function isLight(notes, day) {
  const check = (note) => {
    return dayjs(note.createdAt).isBetween(
      dayjs(`${day} 00:00:00`),
      dayjs(`${day} 23:59:59`)
    );
  };
  return notes.some(check);
}

function numByDate(notes, day) {
  const reducer = function (acc, note) {
    const isSame = dayjs(note.createdAt).isBetween(
      dayjs(`${day} 00:00:00`),
      dayjs(`${day} 23:59:59`)
    );
    if (isSame) {
      acc = acc + 1;
    }
    return acc;
  };
  return notes.reduce(reducer, 0);
}

function Heatmap(props) {
  const notes = useStoreState((state) => state.notes.items);
  const days = [...Array(14)].map((_, count) =>
    dayjs().add(-count, "day").format("YYYY-MM-DD")
  );
  const [num, setNum] = useState(0);
  const [date, setDate] = useState("0000-00-00");
  return (
    <Box>
      <div>Heatmap: {notes.length}</div>
      <div>Num: {num}</div>
      <div>Date: {date}</div>
      <br />
      <CellContainer>
        {days.map((day, key) => (
          <div key={key} onClick={() => {
            setNum(numByDate(notes, day));
            setDate(day);
            }}>
            <Cell light={isLight(notes, day)} />
          </div>
        ))}
      </CellContainer>
    </Box>
  );
}

export default Heatmap;
