import React from "react";
import styled, { css } from "styled-components";

const Balloon = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid gray;
  border-radius: 8px;
  color: gray;
  background: white;
  position: absolute;
  box-sizing: border-box;
  padding: 4px;
  ${(props) => {
    return css`
      left: ${props.x - 45}px;
      top: ${props.y - 50}px; /* 現状ではマジックナンバー */
    `;
  }}
`;

export default Balloon;
