import React from "react";

function Note(props){
  const { body, createdAt, onEdit } = props;
  return (
    <div
      style={{ border: "1px solid", width: "300px", cursor: "pointer" }}
      onClick={() => onEdit()}
    >
      <div>{createdAt}</div>
      <div>{body}</div>
    </div>
  );
};

export default Note;
