import React, { useEffect } from "react";
import Header from "../components/Header";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import dayjs from "dayjs";

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

const Index = ({ val }) => {
  const pageLoad = useStoreActions(actions => actions.page.load);
  const [user, notes] = useStoreState(state => [
    state.user.item,
    state.notes.items
  ]);
  const isPosted = !isEmpty(notes) && isTodayPosted(notes);

  useEffect(() => {
    if (isEmpty(user) && isEmpty(notes)) pageLoad();
  }, [user, notes]);
  return (
    <div>
      <Header />
      <div>
        <h3>Status:</h3>
        <div>{isPosted ? "done" : "you should post"}</div><br />
      </div>
      <div>
        <h3>Notes:</h3>
        <div>
          {notes.length > 0 &&
            notes.map((note, key) => (
              <div key={key}>
                <div>{note.title}</div>
                <div>{note.body}</div>
                <div>{note.createdAt}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
