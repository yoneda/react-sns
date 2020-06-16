import React, { useState } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const Box = styled.div`
  width: 200px;
  height: 100%;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
`;

const Blank = styled.div`
  width: 200px;
  height: auto;
  flex-grow: 1;
`;

const PopupBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

function Popup() {
  return (
    <PopupBox>
      <button>logout</button>
    </PopupBox>
  );
}

function Sidebar() {
  const [isPopuped, updateIsPopuped] = useState(false);
  return (
    <Box>
      <Item>
        <button onClick={() => updateIsPopuped(!isPopuped)}>Kohei</button>
        {isPopuped && <Popup />}
      </Item>
      <Item>
        <Link to="/home">Home</Link>
      </Item>
      <Item>
        <Link to="/setting">Setting</Link>
      </Item>
      <Item>
        <Link to="/trash">Trash</Link>
      </Item>
      <Blank />
      <Item>
        <button onClick={() => {}}>add</button>
      </Item>
    </Box>
  );
}

export default Sidebar;
