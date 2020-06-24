import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import { Link } from "@reach/router";
import styled from "styled-components";

const Box = styled.div`
  width: 240px;
  height: 100%;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  position: fixed;
`;

const Item = styled.div`
  width: 240px;
  height: 60px;
  display: flex;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
`;

const Blank = styled.div`
  width: 240px;
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

function Sidebar(props) {
  const { onClickAdd } = props;
  const { name } = useStoreState((state) => state.app.user);
  const [isPopuped, updateIsPopuped] = useState(false);
  return (
    <Box>
      <Item>
        <button onClick={() => updateIsPopuped(!isPopuped)}>{name}</button>
        {isPopuped && <Popup />}
      </Item>
      <Item>
        <Link to="/">Home</Link>
      </Item>
      <Item>
        <Link to="/trash">Trash</Link>
      </Item>
      <Item>
        <Link to="/setting">Setting</Link>
      </Item>
      <Blank />
      <Item>
        <button onClick={() => onClickAdd()}>add</button>
      </Item>
    </Box>
  );
}

export default Sidebar;
