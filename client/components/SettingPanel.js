import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";
import Switch from "react-input-switch";

const Box = styled.div`
  width: 200px;
`;

function Name() {
  const user = useStoreState((state) => state.app.user);
  const updateUser = useStoreActions((actions) => actions.app.updateUser);
  const closeModal = useStoreActions((actions) => actions.ui.closeModal);
  const [name, setName] = useState("");
  useEffect(() => {
    setName(user.name);
  }, [user]);
  return (
    <div>
      <div>name</div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() =>
          updateUser({
            name,
            onSuccess: () => {
              closeModal();
            },
          })
        }
      >
        change
      </button>
    </div>
  );
}

function HeatmapToggle() {
  const user = useStoreState((state) => state.app.user);
  const updateUser = useStoreActions((actions) => actions.app.updateUser);
  return (
    <div>
      calendar
      <br />
      <Switch
        styles={{ trackChecked: { backgroundColor: "skyblue" } }}
        value={user.showCalendar}
        onChange={(value) => updateUser({ showCalendar: value })}
      />
    </div>
  );
}

function SettingPanel(props) {
  const openModal = useStoreActions((actions) => actions.ui.openModal);
  return (
    <Box>
      <Name />
      <hr />
      <div>
        <div>password</div>
        <button onClick={() => openModal("CHANGE_PASS")}>change</button>
      </div>
      <hr />
      <div>
        <div>danger zone</div>
        <button onClick={() => openModal("DELETE_ACCOUNT")}>delete</button>
      </div>
      <hr />
      <HeatmapToggle />
    </Box>
  );
}

export default SettingPanel;
