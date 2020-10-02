import React, { useState, useEffect, useRef, useCallback } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Popup from "./Popup";
import styled from "styled-components";
import { isEmpty } from "lodash";
import dayjs from "dayjs";

const Box = styled.div`
  border: solid 1px darkgray;
  box-sizing: border-box;
  background: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
`;

const PopupBox = styled.div`
  margin: 10px;
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
      <PopupBox>
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
      </PopupBox>
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
        update
      </button>
      {open && (
        <EditPopup
          position={{ x: 20, y: popupY }}
          onClose={() => setOpen(false)}
        />
      )}
      <button ref={ref} onClick={() => setOpen(true)}>
        menu
      </button>
    </Box>
  );
}

export default EditPanel;
