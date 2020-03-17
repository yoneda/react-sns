import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import Header from "../components/Header";
import Note from "../components/Note";
import EditableNote from "../components/EditableNote";

const isTodayPosted = notes => {
  const preDay = dayjs(dayjs().format("YYYY-M-D"));
  const nextDay = preDay.add(1, "day");
  const isPosted = notes.some(note => {
    const noteDay = dayjs(note.updatedAt);
    const isSame = noteDay.isAfter(preDay) && noteDay.isBefore(nextDay);
    return isSame;
  });
  return isPosted;
};

const Index = () => {
  const [loadNotes, updateNote] = useStoreActions(actions => [
    actions.notes.get,
    actions.notes.update
  ]);
  const notes = useStoreState(state => state.notes.items);
  const isPosted = notes.length > 0 && isTodayPosted(notes);

  useEffect(() => {
    if (isEmpty(notes)) loadNotes();
  }, [notes]);

  return (
    <div>
      <Header />
      <div>
        <h3>Status:</h3>
        <div>{isPosted ? "done" : "you should post"}</div>
        <br />
      </div>
      <div>
        <h3>Notes:</h3>
        <div>
          {notes.length > 0 &&
            notes.map((note, key) => <Note key={key} {...note} />)}
        </div>
      </div>
      <EditableNote
        {...notes[0]}
        onSave={()=>{}}
      />
    </div>
  );
};

export default Index;
