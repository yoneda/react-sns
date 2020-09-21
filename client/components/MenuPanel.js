import React, { useState, useEffect, useRef } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link, navigate } from "@reach/router";
import styled, { css } from "styled-components";
import Popup from "./Popup";

const Box = styled.div`
  background: lightgray;
  height: 60px;
  width: 250px;
  margin: 10px;
  padding: 10px;
`;

const PopupBox = styled.div`
  margin: 10px;
`;

function MenuPopup(props) {
  const { onClose, position } = props;
  const logout = useStoreActions((actions) => actions.app.logout);
  return (
    <Popup onClose={() => onClose()} position={position}>
      <PopupBox>
        <button onClick={() => logout({ onSuccess: () => navigate("/login") })}>
          logout
        </button>
      </PopupBox>
    </Popup>
  );
}

function MenuPanel(props) {
  const [isPopuped, updateIsPopuped] = useState(false);
  const user = useStoreState((state) => state.app.user);
  const openModal = useStoreActions((actions) => actions.ui.openModal);
  const [popupY, setPopupY] = useState(0);
  const ref = useRef();
  useEffect(() => {
    if (ref) {
      const rect = ref.current.getBoundingClientRect();
      setPopupY(rect.y + rect.height + 5);
    }
  });
  return (
    <Box>
      <div>MenuPanel</div>
      <button onClick={() => openModal("SETTING_PANEL")}>setting</button>
      <br />
      <button ref={ref} onClick={() => updateIsPopuped(!isPopuped)}>
        {user.name}
      </button>
      {isPopuped && (
        <MenuPopup
          position={{ x: 20, y: popupY }}
          onClose={() => updateIsPopuped(false)}
        />
      )}
    </Box>
  );
}

export default MenuPanel;
