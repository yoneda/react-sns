import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 200px;
  height: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: gray;
  &:hover {
    background-color: whitesmoke;
  }
  &:active {
    background-color: gainsboro;
  }
`;

function MenuItem(props) {
  const { children, onClick } = props;
  return <Box onClick={onClick}>{children}</Box>;
}

export default MenuItem;
