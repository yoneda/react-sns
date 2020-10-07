import React from "react";
import styled, { css } from "styled-components";

const Box = styled.div`
  width: 200px;
  height: 40px;
  color: gray;
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
  &:active {
    background-color: gainsboro;
  }

  ${(props) =>
    props.selected &&
    css`
      background: whitesmoke;
    `}
`;

function Note(props) {
  const { title, body, selected, onClick } = props;
  return (
    <Box onClick={() => onClick()} selected={selected}>
      <div>{title ? title : "　"}</div>
      <div>{body ? body : "　"}</div>
    </Box>
  );
}

export default Note;
