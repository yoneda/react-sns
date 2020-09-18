import React, { useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import MenuPanel from "./MenuPanel";
import ListPanel from "./ListPanel";
import EditPanel from "./EditPanel";
import Heatmap from "./Heatmap";
import Modal from "./Modal";
import SettingPanel from "./SettingPanel";

const Box = styled.div`
  width: 200px;
  height: 200px;
`;

const NewButton = styled.button`
  margin: 10px;
`;

function V0(props) {
  const user = useStoreState((state) => state.app.user);
  const notes = useStoreState((state) => state.notes.items);
  const focus = useStoreState((state) => state.notes.focus);
  const createNote = useStoreActions((actions) => actions.notes.create);
  const openModal = useStoreActions((actions) => actions.ui.openModal);
  const closeModal = useStoreActions((actions) => actions.ui.closeModal);
  const modals = useStoreState((state) => state.ui.modals);
  const [value, setValue] = useState(0);
  return (
    <Box>
      <h2>Days</h2>
      {modals.map((modal, index) => {
        const position = { x: (index + 1) * 10, y: (index + 1) * 10 };
        if (modal === "SETTING_PANEL") {
          return (
            <Modal
              position={position}
              key={index}
              title="Setting"
              onClose={() => closeModal()}
            >
              <SettingPanel />
            </Modal>
          );
        }
        if (modal === "DELETE_ACCOUNT") {
          return (
            <Modal
              position={position}
              key={index}
              title="DeleteAccount"
              onClose={() => closeModal()}
            >
              aaa
            </Modal>
          );
        }
        if (modal === "CHANGE_PASS") {
          return (
            <Modal
              position={position}
              key={index}
              title="ChangePassword"
              onClose={() => closeModal()}
            >
              bbb
            </Modal>
          );
        }
      })}

      <NewButton
        onClick={() =>
          createNote({
            body: "",
            trashed: false,
            onSuccess: () => {},
          })
        }
      >
        new
      </NewButton>
      <MenuPanel />
      {user.showCalendar ? <Heatmap /> : ""}
      <ListPanel />
      {!isEmpty(focus) && <EditPanel />}
    </Box>
  );
}

export default V0;
