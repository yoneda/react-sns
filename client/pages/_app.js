import { useState, Fragment } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../store";
import Header from "../components/Header";
import EditorModal from "../components/EditorModal";
import dayjs from "dayjs";
import Link from "next/link";

const Menu = () => (
  <Fragment>
    <Link href="/"><a>Top</a></Link> |
    <Link href="/new"><a>New</a></Link> |
    <Link href="/setting"><a>Setting</a></Link> |
    <Link href="/register"><a>Register</a></Link> |
    <Link href="/login"><a>Login</a></Link>
  </Fragment>
)

const MyApp = ({ Component, pageProps }) => {
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
      {
        menuOpen && <Menu />
      }
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
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
};

export default MyApp;
