import { useState, Fragment } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../store";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
};

export default MyApp;
