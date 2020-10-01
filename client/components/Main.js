import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import MenuPanel from "./MenuPanel";
import ListPanel from "./ListPanel";
import EditPanel from "./EditPanel";
import Heatmap from "./Heatmap";
import Modal from "./Modal";
import SettingPanel from "./SettingPanel";
import NewButton from "./NewButton";

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
    </Fragment>
  );
}

const Draggable = styled.div`
  grid-area: drag;
  background-color: lightyellow;
  border-bottom: 1px solid lightgray;
  height: 40px;
  width: 100%;
  -webkit-app-region: drag;
`;

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 200px 250px 1fr;
  grid-template-rows: 40px 1fr 1fr 60px;
  grid-template-areas:
    "drag drag drag"
    "menu heatmap edit"
    "menu list edit"
    "new list edit";
`;

const MenuBox = styled.div`
  grid-area: menu;
  background-color: lightsalmon;
`;

const HeatmapBox = styled.div`
  grid-area: heatmap;
  background-color: lightblue;
`;

const EditBox = styled.div`
  grid-area: edit;
  background-color: lightpink;
`;

const ListBox = styled.div`
  grid-area: list;
  background-color: lightgreen;
`;

const NewBox = styled.div`
  grid-area: new;
  background-color: lightcoral;
`;

function Main(props) {
  const user = useStoreState((state) => state.app.user);
  const focus = useStoreState((state) => state.notes.focus);
  return (
    <Fragment>
      <Modals />
      <Layout>
        <Draggable />
        <MenuBox>
          <MenuPanel />
        </MenuBox>
        <NewBox>
          <NewButton />
        </NewBox>
        <HeatmapBox>
          <Heatmap />
        </HeatmapBox>
        <ListBox>
          <ListPanel />
        </ListBox>
        <EditBox>
          <EditPanel />
        </EditBox>
      </Layout>
    </Fragment>
  );
}

export default Main;
