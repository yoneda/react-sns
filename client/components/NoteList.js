import React, { Fragment } from "react";
import Note from "./Note";

const NoteList = (props) => {
  const { notes, operateHandler } = props;
  return (
    <Fragment>
      {notes.map((note, index) => (
        <Note
          key={index}
          body={note.body}
          createdAt={note.createdAt}
          onEdit={() => operateHandler(index)}
        />
      ))}
    </Fragment>
  );
};

export default NoteList;
