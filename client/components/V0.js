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

function DeleteModal(props) {
  const { position } = props;
  const [deleteUser, closeModal, cleanModal] = useStoreActions((actions) => [
    actions.app.deleteUser,
    actions.ui.closeModal,
    actions.ui.cleanModal,
  ]);
  return (
    <Modal
      position={position}
      title="DeleteAccount"
      onClose={() => closeModal()}
    >
      <div>Are you sure?</div>
      <button onClick={() => deleteUser({ onSuccess: () => cleanModal() })}>
        delete
      </button>
      <br />
      <button onClick={() => closeModal()}>close</button>
    </Modal>
  );
}

function PasswordModal(props) {
  const { position } = props;
  const [word, setWord] = useState("");
  const [updateUser, closeModal, cleanModal] = useStoreActions((actions) => [
    actions.app.updateUser,
    actions.ui.closeModal,
    actions.ui.cleanModal,
  ]);
  return (
    <Modal
      position={position}
      title="ChangePassword"
      onClose={() => closeModal()}
    >
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <br />
      <button
        onClick={() =>
          updateUser({ password: word, onSuccess: () => cleanModal() })
        }
      >
        change
      </button>
      <br />
      <button onClick={() => closeModal()}>close</button>
    </Modal>
  );
}

function V0(props) {
  const user = useStoreState((state) => state.app.user);
  const focus = useStoreState((state) => state.notes.focus);
  const createNote = useStoreActions((actions) => actions.notes.create);
  const closeModal = useStoreActions((actions) => actions.ui.closeModal);
  const modals = useStoreState((state) => state.ui.modals);
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
          return <DeleteModal position={position} key={index} />;
        }
        if (modal === "CHANGE_PASS") {
          return <PasswordModal position={position} key={index} />;
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
