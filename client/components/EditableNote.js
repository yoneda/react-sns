import React from "react";

const EditableNote = props => {
  const { title, setTitle, body, setBody, createdAt, onSave } = props;
  return (
    <div style={{ backgroundColor: "lightgray", width: "200px"}}>
      <div>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </div>
      <div>{createdAt}</div>
      <button onClick={() => onSave()}>save</button>
    </div>
  );
};

export default EditableNote;
