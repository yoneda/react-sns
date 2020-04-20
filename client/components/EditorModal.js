import React, { useState, Fragment } from "react";

const backStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
  left: 0,
  top: 0,
  background: "rgba(0,0,0, 0.5)",
};

const modalStyle = {
  border: "1px solid",
  backgroundColor: "white",
  width: "50%",
  height: "50%",
  top: "25%",
  left: "25%",
  position: "absolute",
};

function EditorModal(props) {
  const { datetime, body, closeHandler, saveHandler } = props;
  const [text, setText] = useState(body);

  return (
    <Fragment>
      <div style={backStyle} onClick={() => closeHandler()}></div>
      <div style={modalStyle}>
        <div>日付: {datetime}</div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button onClick={() => saveHandler(text)}>save</button>
      </div>
    </Fragment>
  );
}

export default EditorModal;
