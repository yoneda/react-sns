import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import NoteList from "../components/NoteList";
import EditorModal from "../components/EditorModal";

const Index = () => {
  const [loadUser, loadNotes, updateNote] = useStoreActions((actions) => [
    actions.user.get,
    actions.notes.get,
    actions.notes.update,
  ]);
  const notes = useStoreState((state) => state.notes.items);

  const [operateIndex, setOperateIndex] = useState(-1);

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
    </div>
  );
};

export default Index;
