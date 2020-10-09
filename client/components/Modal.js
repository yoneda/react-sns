import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { isEmpty } from "lodash";
import X from "./icons/X";

const BackBox = styled.div`
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Box = styled.div`
  background: white;
  height: 300px;
  width: 270px;
  position: absolute;
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

  display: grid;
  grid-template-rows: 40px 1fr;
  grid-template-columns: 1fr 40px;
  grid-template-areas:
    "title close"
    "main main";
`;

const Close = styled.div`
  grid-area: close;
  padding: 5px;
`;

const CloseIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  color: gray;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
  }
  &:active {
    background-color: gainsboro;
  }
`;

const Title = styled.div`
  grid-area: title;
  padding-top: 10px;
  padding-left: 10px;
`;

const Main = styled.div`
  grid-area: main;
  padding-top: 10px;
  padding-left: 10px;
`;

function Modal(props) {
  const { position, title, children, onClose } = props;
  return (
    <Fragment>
      <BackBox onClick={() => onClose()} />
      <Box position={position}>
        <Title>{title}</Title>
        <Close>
          <CloseIcon onClick={() => onClose()}>
            <X />
          </CloseIcon>
        </Close>
        <Main>{children}</Main>
      </Box>
    </Fragment>
  );
}

export default Modal;
