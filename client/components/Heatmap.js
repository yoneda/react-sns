import React from "react";
import { useStoreState } from "easy-peasy";
import styled from "styled-components";

function Labels() {
  return <div>日 月 火 水 木 金 土</div>;
}

function Heatmap(props) {
  const notes = useStoreState((state) => state.notes.items);
  return (
    <div>
      <Labels />
      text text text
    </div>
  );
}

export default Heatmap;
