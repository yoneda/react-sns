import { StoreProvider } from "easy-peasy";
import store from "../store";

const MyApp = ({ Component, pageProps }) => {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default MyApp;