import React, { Fragment, useState, useRef } from "react";
import { useStoreState } from "easy-peasy";
import styled, { css } from "styled-components";
import dayjs from "dayjs";

const Box = styled.div`
  width: 250px;
  height: 100px;
  border: 2px solid gray;
  box-sizing: border-box;
`;

const Cell = styled.div`
  background: white;
  border: solid gray 2px;
  border-radius: 4px;
  height: 8px;
  width: 8px;
  ${(props) =>
    props.light &&
    css`
      background: lightgray;
    `}
`;

const CellRowBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

function CellRow(props) {
  const { children } = props;
  return <CellRowBox>{children}</CellRowBox>;
}

const Balloon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 30px;
  width: 80px;
  border: solid darkgray 1px;
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

function CellTable() {
  const numByDate = useStoreState((state) => state.notes.numByDate);
  const [info, setInfo] = useState({ num: 0, date: "", x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const refs = [...Array(14)].map(() => useRef(null));
  const onMouseOver = (index, day) => {
    const rect = refs[index].current.getBoundingClientRect();
    const num = numByDate(day);
    setInfo({ num, date: day, x: rect.x, y: rect.y });
    setOpen(true);
  };
  const onMouseOut = () => {
    setInfo({ num: 0, date: "", x: 0, y: 0 });
    setOpen(false);
  };

  return (
    <Fragment>
      {open && (
        <Balloon x={info.x} y={info.y}>
          <span>{info.num > 0 ? `${info.num}件の投稿` : "投稿なし"}</span>
          <span>{info.date}</span>
        </Balloon>
      )}
      {[...Array(2)].map((_, row) => (
        <CellRow>
          {[...Array(7)].map((_, column) => {
            const index = row * 7 + column;
            const day = dayjs().add(-index, "day").format("YYYY-MM-DD");
            return (
              <Cell
                key={index}
                ref={refs[index]}
                light={numByDate(day) > 0}
                onMouseOver={() => onMouseOver(index, day)}
                onMouseOut={() => onMouseOut()}
              />
            );
          })}
        </CellRow>
      ))}
    </Fragment>
  );
}

function Heatmap() {
  return (
    <Box>
      <CellTable />
    </Box>
  );
}

export default Heatmap;
