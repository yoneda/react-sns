import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 200px;
  height: 160px;
  border: solid 1px lightgray;
  border-radius: 10px;
  margin: 0px 20px 20px 0px;
  padding: 20px;
  overflow: hidden;
`;

const Title = styled.div`
  font-weight: bold;
`;

function Note2(props) {
  const { title, body } = props;
  return (
    <Box>
      <Title>{title}</Title>
      <div>{body}</div>
    </Box>
  );
}

export default Note2;
