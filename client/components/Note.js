import React from "react";

const Note = props => {
  const { body, createdAt, onEdit } = props;
  return (
    <div>
      <div>{body}</div>
      <div>{createdAt}</div>
      <button onClick={() => onEdit()}>edit</button>
    </div>
  );
};

export default Note;
