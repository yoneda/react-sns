import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "styled-components";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import Popup from "./Popup";

const Text = styled.div`
  color: gray;
`;

function EditPopup(props) {
  const { onClose, position } = props;
  const note = useStoreState((state) => state.notes.focus);
  const removeNote = useStoreActions((actions) => actions.notes.remove);
  const onClickDelete = () =>
    removeNote({ id: note.id, onSuccess: () => onClose() });
  const date = dayjs(note.createdAt).format("YYYY-M-d");
  const emptyDate = "XXXX-XX-XX";
  return (
    <Popup onClose={() => onClose()} position={position}>
      <button onClick={() => onClickDelete()}>delete</button>
      <hr />
      <Text>
        <div>date: {isEmpty(note) ? emptyDate : date}</div>
        <div>count: {isEmpty(note) ? "0" : note.body.length}</div>
      </Text>
    </Popup>
  );
}

export default EditPopup;
