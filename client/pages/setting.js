import React from "react";
import Header from "../components/Header";
import { useStoreState, useStoreActions } from "easy-peasy";

const Setting = props => {
  const { num, name } = props;
  const notes = useStoreState(state => state.notes.items);
  // const getNotes = useStoreActions(actions => actions.notes.get);
  const user = useStoreState(state => state.user.item);
  // const getUser = useStoreActions(actions => actions.user.get);
  const load = useStoreActions(actions => actions.page.load);
  
  return (
    <div>
      <Header />
      setting
      <button
        onClick={() => {
          load();
        }}
      >
        ok
      </button>
      {notes.length > 0 &&
        notes.map((note, key) => (
          <div key={key}>
            <div>{note.title}</div>
            <div>{note.body}</div>
            <div>{note.createdAt}</div>
            <br />
          </div>
        ))}
    </div>
  );
};

export default Setting;
