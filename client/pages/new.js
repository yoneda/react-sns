import React, { useState } from "react";
import Router from "next/router";
import { useStoreActions } from "easy-peasy";
import dayjs from "dayjs";
import Header from "../components/Header";

const New = () => {
  const today = dayjs().format("YYYY-M-D");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const createNote = useStoreActions(actions => actions.notes.create);

  return (
    <div>
      <Header />
      <h3>New:</h3>
      <div>{today}</div>
      <div>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="body"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </div>
      <button
        onClick={() =>
          createNote({
            account: "yoneda",
            title,
            body,
            onSuccess: () => Router.push("/")
          })
        }
      >
        send
      </button>
    </div>
  );
};

export default New;
