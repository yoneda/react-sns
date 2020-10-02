import React, { useState, useEffect, useRef } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link, navigate } from "@reach/router";
import styled, { css } from "styled-components";
import Popup from "./Popup";
import SettingIcon from "./SettingIcon";
import AccountIcon from "./AccountIcon";

const Box = styled.div`
  height: 100px;
  width: 200px;
`;

const PopupBox = styled.div`
  margin: 10px;
`;

const MenuItem = styled.div`
  margin-left: 5px;
  margin-top: 5px;
`;

const MenuButton = styled.button`
  height: 40px;
  width: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MenuSetting() {
  const openModal = useStoreActions((actions) => actions.ui.openModal);
  return (
    <MenuItem>
      <MenuButton onClick={() => openModal("SETTING_PANEL")}>
        <SettingIcon />
        setting
      </MenuButton>
    </MenuItem>
  );
}

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
      <MenuItem>
        <MenuButton ref={ref} onClick={() => updateIsPopuped(!isPopuped)}>
          <AccountIcon />
          {user.name}
        </MenuButton>
      </MenuItem>
      <MenuSetting />
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
