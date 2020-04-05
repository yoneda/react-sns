import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import NoteList from "../components/NoteList";

const isTodayPosted = (notes) => {
  const preDay = dayjs(dayjs().format("YYYY-M-D"));
  const nextDay = preDay.add(1, "day");
  const isPosted = notes.some((note) => {
    const noteDay = dayjs(note.updatedAt);
    const isSame = noteDay.isAfter(preDay) && noteDay.isBefore(nextDay);
    return isSame;
  });
  return isPosted;
};

const Index = () => {
  const [loadUser, loadNotes, updateNote] = useStoreActions((actions) => [
    actions.user.get,
    actions.notes.get,
    actions.notes.update,
  ]);
  const notes = useStoreState((state) => state.notes.items);

  useEffect(() => {
    if (isEmpty(notes)) {
      loadNotes();
      loadUser();
    }
  }, [notes]);

  return (
    <div>
      <div>
        <h3>Calendar:</h3>
        <div>work in progress</div>
        <br />
      </div>
      <div>
        <h3>Notes:</h3>
        <NoteList notes={notes} updateNote={updateNote} />
      </div>
    </div>
  );
};

export default Index;
