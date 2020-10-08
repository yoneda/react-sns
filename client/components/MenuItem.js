import React, { forwardRef } from "react";
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

const MenuItem = forwardRef(function (props, ref) {
  const { children, onClick } = props;
  return (
    <Box ref={ref} onClick={onClick}>
      {children}
    </Box>
  );
});

export default MenuItem;
