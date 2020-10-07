import React, { useState, useEffect, useRef, useCallback } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Popup from "./Popup";
import styled from "styled-components";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import Edit from "./icons/Edit";
import Menu from "./icons/Menu";

const Box = styled.div`
  border: solid 2px black;
  border-radius: 10px;
  box-sizing: border-box;
  background: white;
  width: 300px;
  height: 500px;
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
          onClick={() =>
            removeNote({ id: note.id, onSuccess: () => onClose() })
          }
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
        <div
          contentEditable={true}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        >
          {note.title}
        </div>
        <div
          contentEditable={true}
          onChange={(e) => setNote({ ...note, body: e.target.value })}
        >
          {note.body}
        </div>
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

export default EditPanel;
