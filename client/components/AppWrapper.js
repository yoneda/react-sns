import { useState, Fragment } from "react";
import store from "../store";
import Header from "../components/Header";
import EditorModal from "../components/EditorModal";
import dayjs from "dayjs";
import { useStoreActions } from "easy-peasy";

const Menu = () => {
  const logout = useStoreActions((actions) => actions.app.logout);
  const onSuccess = () => Router.push("/");
  return (
    <Fragment>
      <Link href="/">
        <a>Top</a>
      </Link>{" "}
      |
      <Link href="/new">
        <a>New</a>
      </Link>{" "}
      |
      <Link href="/setting">
        <a>Setting</a>
      </Link>{" "}
      |<button onClick={() => logout({ onSuccess })}>logout</button>
    </Fragment>
  );
};

function AppWrapper(props) {
  const { children } = props;
  const createNote = store.getActions().notes.create;
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const today = dayjs().format("YYYY-M-D");

  return (
    <div>
      <Header>
        <button onClick={() => setOpen(!open)}>add</button>
        <button onClick={() => setMenuOpen(!menuOpen)}>menu</button>
      </Header>
      {menuOpen && <Menu />}
      {open && (
        <EditorModal
          datetime={today}
          text=""
          closeHandler={() => setOpen(false)}
          saveHandler={(text) =>
            createNote({
              account: "yoneda",
              body: text,
              onSuccess: () => setOpen(false),
            })
          }
        />
      )}
      {children}
    </div>
  );
}

export default AppWrapper;
