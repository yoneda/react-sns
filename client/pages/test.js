import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Header from "../components/Header";
import NoteList from "../components/NoteList";

const Test = props => {
  const notes = useStoreState(state => state.notes.items);
  const updateNote = useStoreActions(actions => actions.notes.update);
  return (
    <div>
      <Header />
      <NoteList notes={notes} updateNote={updateNote} />
    </div>
  );
};

export default Test;
