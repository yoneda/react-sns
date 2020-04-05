import React, { useState } from "react";

const EditorModal = (props) => {
  const { datetime, body, closeHandler, saveHandler } = props;
  const [text, setText] = useState(body);
  return (
    <div
      style={{ width: "200px", border: "1px solid", backgroundColor: "white" }}
    >
      <div>日付: {datetime}</div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      /><br />
      <button onClick={() => saveHandler(text)}>save</button><br />
      <button onClick={() => closeHandler()}>close</button>
    </div>
  );
};

export default EditorModal;
