import React, { useState } from "react";
import Note from "./Note";
import EditableNote from "./EditableNote";

const NoteList = props => {
  const { notes, updateNote } = props;
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [editableTitle, setEditableTitle] = useState(
    updateIndex === -1 ? "" : notes[updateIndex].title
  );
  const [editableBody, setEditableBody] = useState(
    updateIndex === -1 ? "" : notes[updateIndex].body
  );
  const onSuccess = () => setUpdateIndex(-1);

  return (
    <div>
      {notes.length > 0 &&
        notes.map((note, key) => {
          if (key === updateIndex) {
            return (
              <EditableNote
                title={editableTitle}
                body={editableBody}
                createdAt={note.createdAt}
                setTitle={value => setEditableTitle(value)}
                setBody={value => setEditableBody(value)}
                key={key}
                onSave={() =>
                  updateNote({
                    id: note.id,
                    title: editableTitle,
                    body: editableBody,
                    onSuccess
                  })
                }
              />
            );
          } else {
            return (
              <Note
                {...note}
                key={key}
                onEdit={() => {
                  setEditableTitle(notes[key].title);
                  setEditableBody(notes[key].body);
                  setUpdateIndex(key);
                }}
              />
            );
          }
        })}
    </div>
  );
};

export default NoteList;
