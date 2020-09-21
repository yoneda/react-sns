import React, { useState, Fragment } from "react";
import styled, { css } from "styled-components";
import { isEmpty } from "lodash";

const BackBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0);
`;

const Box = styled.div`
  background: white;
  height: 100px;
  width: 160px;
  position: absolute;
  border: 1px solid black;
  ${(props) => {
    if (!isEmpty(props.position)) {
      return css`
        left: ${props.position.x}px;
        top: ${props.position.y}px;
      `;
    } else {
      return css`
        left: 10px;
        top: 10px;
      `;
    }
  }}
`;

function Popup(props) {
  const { position, children, onClose } = props;
  return (
    <Fragment>
      <BackBox onClick={() => onClose()} />
      <Box position={position}>{children}</Box>
    </Fragment>
  );
}

export default Popup;
