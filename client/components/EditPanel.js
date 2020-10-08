import React, { useState, useEffect, useRef, Fragment, useCallback} from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Popup from "./Popup";
import styled from "styled-components";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import Edit from "./icons/Edit";
import Menu from "./icons/Menu";
import DotCircle from "./icons/DotCircle";

const Box = styled.div`
  border: solid 2px gray;
  box-sizing: border-box;
  background: white;
  width: 250px;
  height: 200px;
  display: grid;
  grid-template-rows: 40px 1fr;
  grid-template-columns: 1fr 80px;
  grid-template-areas:
    ". buttons"
    "main main";
`;

const ButtonBox = styled.div`
  grid-area: buttons;
`;

const MainBox = styled.div`
  grid-area: main;
`;

const DetailBox = styled.div`
  color: gray;
`;

function EditPopup(props) {
  const { onClose, position } = props;
  const note = useStoreState((state) => state.notes.focus);
  const removeNote = useStoreActions((actions) => actions.notes.remove);
  return (
    <Popup onClose={() => onClose()} position={position}>
      <button
        onClick={() => removeNote({ id: note.id, onSuccess: () => onClose() })}
      >
        delete
      </button>
      <hr />
      <DetailBox>
        <div>
          date:{" "}
          {isEmpty(note)
            ? "XXXX-XX-XX"
            : dayjs(note.createdAt).format("YYYY-M-d")}
        </div>
        <div>count: {isEmpty(note) ? "0" : note.body.length}</div>
      </DetailBox>
    </Popup>
  );
}

const EditorBox = styled.div`
  width: 200px;
  height: 100px;
  background-color: whitesmoke;
`;

function Editor(props) {
  const [content, setContent] = useState("タイトル。\n内容内容\n私の名前は");
  const texts = content.split("\n");
  return (
    <Fragment>
      {texts.map((text, index) => (
        <div
          key={index}
          contentEditable={true}
          onInput={(e) => {
            const text = e.target.textContent;
            const prev = texts.splice(0, index).join("\n");
            const next = texts.splice(index).join("\n");
            setContent([prev, text, next].join("\n"));
          }}
        >
          {text}
        </div>
      ))}
    </Fragment>
  );
}

function EditPanel(props) {
  const note = useStoreState((state) => state.notes.focus);
  const setNote = useStoreActions((actions) => actions.notes.setFocus);
  const updateNote = useStoreActions((actions) => actions.notes.update);
  const [open, setOpen] = useState(false);
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
      <ButtonBox>
        <button
          onClick={(e) => {
            updateNote({
              id: note.id,
              title: note.title,
              body: note.body,
              onSuccess: () => {},
            });
          }}
        >
          <Edit />
        </button>
        <button ref={ref} onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </ButtonBox>
      <MainBox>
        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <input
          type="text"
          value={note.body}
          onChange={(e) => setNote({ ...note, body: e.target.value })}
        />
        <Editor />
      </MainBox>
      {open && (
        <EditPopup
          position={{ x: 600, y: popupY }}
          onClose={() => setOpen(false)}
        />
      )}
    </Box>
  );
}

const EditPaneBox = styled.div`
  height: 200px;
  width: 250px;
  border: 2px gray solid;
  box-sizing: border-box;
  background: white;
`;

const EditorBox2 = styled.div`
  width: 200px;
  height: 180px;
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-template-rows: 30px 1fr;
  grid-template-areas:
    ". menu"
    "main main";
`;

const EditorMenu = styled.div`
  grid-area: menu;
  cursor: pointer;
  color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: whitesmoke;
  }
  &:active {
    background-color: gainsboro;
  }
`;

const EditorMain = styled.div`
  grid-area: main;
  background-color: gray;
`;

function Editor() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({});
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();
      setPos({ x: rect.x, y: rect.y });
    }
  }, []);
  return (
    <EditorBox2>
      <EditorMain />
      <EditorMenu ref={measuredRef} onClick={() => setOpen(true)}>
        <DotCircle />
      </EditorMenu>
      {open && (
        <EditPopup
          position={{ x: pos.x, y: pos.y + 30}}
          onClose={() => setOpen(false)}
        />
      )}
    </EditorBox2>
  );
}

function EditPane() {
  return (
    <EditPaneBox>
      <Editor />
    </EditPaneBox>
  );
}

export default EditPane;
