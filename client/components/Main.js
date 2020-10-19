import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import MenuPane from "./MenuPane";
import ListPane from "./ListPane";
import EditPane from "./EditPane";
import Heatmap from "./Heatmap";
import Modal from "./Modal";
import SettingPanel from "./SettingPanel";
import { modal as modalIds } from "../const/const";

const Draggable = styled.div`
  grid-area: drag;
  border-bottom: 1px solid darkgray;
  height: 40px;
  width: 100%;
  -webkit-app-region: drag;
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

function Modals() {
  const closeModal = useStoreActions((actions) => actions.ui.closeModal);
  const modals = useStoreState((state) => state.ui.modals);
  return (
    <Fragment>
      {modals.map((modal, index) => {
        const position = { x: (index + 1) * 10, y: (index + 1) * 10 };
        if (modal === modalIds.SETTING_PANEL) {
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
        if (modal === modalIds.DELETE_ACCOUNT) {
          return <DeleteModal position={position} key={index} />;
        }
        if (modal === modalIds.CHANGE_PASS) {
          return <PasswordModal position={position} key={index} />;
        }
      })}
    </Fragment>
  );
}

function Main() {
  return (
    <Fragment>
      <Modals />
      <Draggable />
      <Heatmap />
      <MenuPane />
      <ListPane />
      <EditPane />
    </Fragment>
  );
}

export default Main;
