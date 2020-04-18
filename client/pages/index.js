import React, { useState, Fragment } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import dayjs from "dayjs";
import NoteList from "../components/NoteList";
import EditorModal from "../components/EditorModal";
import Header from "../components/Header";
import Menu from "../components/Menu";

function Index() {
  const [user, notes] = useStoreState((state) => [
    state.app.isAuth,
    state.notes.items,
  ]);
  const [createNote, updateNote] = useStoreActions((actions) => [
    actions.notes.create,
    actions.notes.update,
  ]);

  const [operateIndex, setOperateIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const today = dayjs().format("YYYY-M-D");
  return (
    <Fragment>
      <Header>
        <button onClick={() => setOpen(!open)}>add</button>
        <button onClick={() => setMenuOpen(!menuOpen)}>menu</button>
      </Header>
      <div>
        <h3>Notes:</h3>
        <NoteList
          notes={notes}
          operateHandler={(index) => setOperateIndex(index)}
        />
      </div>
      {menuOpen && <Menu closeHandler={() => setMenuOpen(false)} />}
      {operateIndex >= 0 && (
        <EditorModal
          datetime={notes[operateIndex].createdAt}
          body={notes[operateIndex].body}
          closeHandler={() => setOperateIndex(-1)}
          saveHandler={(text) =>
            updateNote({
              id: notes[operateIndex].id,
              body: text,
              onSuccess: () => setOperateIndex(-1),
            })
          }
        />
      )}
      {open && (
        <EditorModal
          datetime={today}
          body=""
          closeHandler={() => setOpen(false)}
          saveHandler={(text) =>
            createNote({
              account: user.account,
              body: text,
              onSuccess: () => setOpen(false),
            })
          }
        />
      )}
    </Fragment>
  );
}

export default Index;
