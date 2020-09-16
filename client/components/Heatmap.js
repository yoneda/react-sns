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
      left: ${props.x}px;
      top: ${props.y}px;
    `;
  }}
`;

function Heatmap(props) {
  const notes = useStoreState((state) => state.notes.items);
  const numByDate = useStoreState((state) => state.notes.numByDate);
  const days = [...Array(14)].map((_, count) =>
    dayjs().add(-count, "day").format("YYYY-MM-DD")
  );
  // TODO:
  // 14個の日付の生成部分、ComponentDidUpdateごとに毎回計算されてしまってる
  // memo化をして一度計算したら次回以降はキャッシュにアクセスして計算量を減らせる
  const [num, setNum] = useState(0);
  const [date, setDate] = useState("0000-00-00");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const eles = [...Array(14)].map(() => useRef(null));
  return (
    <Box>
      <Balloon x={x} y={y}>
        <span>{num}件の投稿</span>
        <span>{date}</span>
      </Balloon>
      <br />
      <CellContainer>
        {days.map((day, key) => (
          <div
            ref={eles[key]}
            key={key}
            onMouseOver={() => {
              setNum(numByDate(day));
              setDate(day);
              const eleRect = eles[key].current.getBoundingClientRect();
              setX(eleRect.x);
              setY(eleRect.y);
            }}
          >
            <Cell light={numByDate(day) > 0} />
          </div>
        ))}
      </CellContainer>
    </Box>
  );
}

export default Heatmap;
