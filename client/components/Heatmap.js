import React, { useState, useRef } from "react";
import { useStoreState } from "easy-peasy";
import styled, { css } from "styled-components";
import dayjs from "dayjs";

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

const Balloon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 30px;
  width: 80px;
  border: solid black 1px;
  border-radius: 8px;
  background: white;
  position: absolute;
  ${(props) => {
    return css`
      left: ${props.x - 35}px;
      top: ${props.y - 45}px;
    `;
  }}
`;

function Heatmap(props) {
  const numByDate = useStoreState((state) => state.notes.numByDate);
  const [cellInfo, setCellInfo] = useState({ num: 0, date: "" });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const refs = [...Array(14)].map(() => useRef(null));
  const days = [...Array(14)].map((_, count) =>
    dayjs().add(-count, "day").format("YYYY-MM-DD")
  );
  // TODO: memo化をして計算量を減らす
  return (
    <Box>
      {open && (
        <Balloon x={position.x} y={position.y}>
          <span>{cellInfo.num}件の投稿</span>
          <span>{cellInfo.date}</span>
        </Balloon>
      )}
      <br />
      <CellContainer>
        {days.map((day, key) => (
          <Cell
            key={key}
            ref={refs[key]}
            light={numByDate(day) > 0}
            onMouseOver={() => {
              setCellInfo({ num: numByDate(day), date: day });
              const rect = refs[key].current.getBoundingClientRect();
              setPosition({ x: rect.x, y: rect.y });
              setOpen(true);
            }}
            onMouseOut={() => {
              setCellInfo({ num: 0, date: "" });
              setPosition({ x: 0, y: 0 });
              setOpen(false);
            }}
          />
        ))}
      </CellContainer>
    </Box>
  );
}

export default Heatmap;
