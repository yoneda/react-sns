import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";

const Box = styled.div`
  background: lightgray;
  height: 70px;
  width: 200px;
  margin: 10px;
  padding: 10px;
`;

function EditPanel(props) {
  const [title, setTitle] = useState(props.note.title);
  const [body, setBody] = useState(props.note.body);
  useEffect(() => {
    setTitle(props.note.title);
    setBody(props.note.body);
  }, [props.note]);
  return (
    <Box>
      <div>Edit panel</div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.body)}
      />
    </Box>
  );
}

export default EditPanel;
