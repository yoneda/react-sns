import React, { useState, useCallback } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { navigate } from "@reach/router";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import Popup from "./Popup";
import Setting from "./icons/Setting";
import Account from "./icons/Account";

const Box = styled.div`
  height: 100px;
  width: 250px;
  border: 2px gray solid;
  box-sizing: border-box;
`;

function MenuPane() {
  const [open, setOpen] = useState(false);
  const user = useStoreState((state) => state.app.user);
  const openModal = useStoreActions((actions) => actions.ui.openModal);
  const logout = useStoreActions((actions) => actions.app.logout);
  const doLogout = () => logout({ onSuccess: () => navigate("/login") });
  const [pos, setPos] = useState({});
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();
      setPos({ x: rect.x, y: rect.y });
    }
  }, []);
  return (
    <Box>
      {open && (
        <Popup position={{ x: pos.x, y: pos.y }} onClose={() => setOpen(false)}>
          <button onClick={() => doLogout()}>logout</button>
        </Popup>
      )}
      <MenuItem ref={measuredRef} onClick={() => setOpen(true)}>
        <Account />
        {user.name}
      </MenuItem>
      <MenuItem onClick={() => openModal("SETTING_PANEL")}>
        <Setting />
        setting
      </MenuItem>
    </Box>
  );
}

export default MenuPane;
