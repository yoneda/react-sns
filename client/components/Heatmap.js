import React from "react";
import { useStoreState } from "easy-peasy";
import dayjs from "dayjs";
import styled from "styled-components";
import { times } from "lodash";

function Labels() {
  return <div>日 月 火 水 木 金 土</div>;
}

function Cell(props) {
  const { recorded } = props;
  if (recorded === true) {
    return <span>■</span>;
  } else {
    return <span>□</span>;
  }
}

function CellTable(props) {
  const notes = useStoreState((state) => state.notes.items);
  const today = dayjs();
  const cellNum = today.day() + 4 * 7;
  const cells = times(cellNum).map((num) => {
    const isNewline = (num + 1) % 7 === 0;
    const day = today.add(-num, "day");
    const recorded = notes.some((note) => {
      const isSame =
        day.isSame(dayjs(note.createdAt), "year") &&
        day.isSame(dayjs(note.createdAt), "month") &&
        day.isSame(dayjs(note.createdAt), "day");
      return isSame;
    });
    return (
      <span>
        <Cell recorded={recorded} />
        {isNewline && <br />}
      </span>
    );
  });
  return <div>{cells}</div>;
}

function Heatmap(props) {
  return (
    <div>
      <Labels />
      <CellTable />
    </div>
  );
}

export default Heatmap;
