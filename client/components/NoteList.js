import React, { Fragment } from "react";
import Note from "./Note";

function NoteList(props){
  const { notes, operateHandler } = props;
  return (
    <Fragment>
      {notes.map((note, index) => (
        <Fragment key={index}>
          <Note
            body={note.body}
            createdAt={note.createdAt}
            onEdit={() => operateHandler(index)}
          />
          <br />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default NoteList;
