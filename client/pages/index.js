import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import Router from "next/router";
import NoteList from "../components/NoteList";
import EditorModal from "../components/EditorModal";
import AppWrapper from "../components/AppWrapper";

const Index = () => {
  const [user, notes] = useStoreState((state) => [
    state.app.isAuth,
    state.notes.items,
  ]);
  const [loadNotes, updateNote] = useStoreActions((actions) => [
    actions.notes.get,
    actions.notes.update,
  ]);

  const [operateIndex, setOperateIndex] = useState(-1);

  useEffect(() => {
    // 未ログインの場合、ログイン画面に飛ばす
    if (isEmpty(user)) {
      Router.push("/login");
    }
    if (isEmpty(notes) && user.account) {
      loadNotes(user.account);
    }
  }, [user, notes]);

  return (
    <div>
      {isEmpty(user) ? (
        <div>moving…</div>
      ) : (
        <AppWrapper>
          <div>
            <h3>Notes:</h3>
            <NoteList
              notes={notes}
              operateHandler={(index) => setOperateIndex(index)}
            />
          </div>
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
        </AppWrapper>
      )}
    </div>
  );
};

export default Index;
