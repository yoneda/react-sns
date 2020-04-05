import { useState } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../store";
import Header from "../components/Header";
import EditorModal from "../components/EditorModal";
import dayjs from "dayjs";

const MyApp = ({ Component, pageProps }) => {
  const [open, setOpen] = useState(false);
  const today = dayjs().format("YYYY-M-D");
  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Header>
        <button onClick={() => setOpen(!open)}>add</button>
      </Header>
      {open && (
        <EditorModal
          datetime={today}
          text=""
          closeHandler={() => setOpen(false)}
          saveHandler={(text) => console.log(text)}
        />
      )}
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
};

export default MyApp;
