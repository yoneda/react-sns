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
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: bold;
`;

function Note(props) {
  const { title, body, onEdit} = props;
  return (
    <Box onClick={() => onEdit()}>
      <Title>{title}</Title>
      <div>{body}</div>
    </Box>
  );
}

export default Note;
