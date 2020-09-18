import React, { useState, Fragment } from "react";
import styled, { css } from "styled-components";
import { isEmpty } from "lodash";

const BackBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
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
  grid-template-rows: 30px 1fr;
  grid-template-columns: 1fr 30px;
  grid-template-areas:
    "title close"
    "content content";
`;

const CloseBox = styled.div`
  grid-area: close;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleBox = styled.div`
  grid-area: title;
  padding-top: 10px;
  padding-left: 10px;
`;

const ContentBox = styled.div`
  grid-area: content;
  padding-top: 10px;
  padding-left: 10px;
`;

function CloseIcon(props) {
  const { color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
    >
      <path
        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
        fill={color}
      />
    </svg>
  );
}

function CloseButton(props) {
  const { onClick } = props;
  return <button onClick={() => onClick()}>x</button>;
}

function Modal(props) {
  const { position, title, children, onClose } = props;
  return (
    <Fragment>
      <BackBox onClick={() => onClose()} />
      <Box position={position}>
        <TitleBox>{title}</TitleBox>
        <CloseBox>
          <CloseButton onClick={() => onClose()} />
        </CloseBox>
        <ContentBox>{children}</ContentBox>
      </Box>
    </Fragment>
  );
}

export default Modal;
