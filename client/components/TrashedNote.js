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

// TODO: グリッドレイアウトを軽く復習して追加
const Footer = styled.div`
  bottom: 0;
`;

function TrashedNote(props) {
  const { title, body, onRestore, onDelete } = props;
  return (
    <Box>
      <Title>{title}</Title>
      <div>{body}</div>
      <Footer>
        <button onClick={() => onDelete()}>完全に削除</button>
        <button onClick={() => onRestore()}>もとに戻す</button>
      </Footer>
    </Box>
  );
}

export default TrashedNote;
