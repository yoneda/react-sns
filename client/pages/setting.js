import React, { useState, useEffect, Fragment } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { navigate } from "@reach/router";
import { Tabs, TabPanel } from "../components/Tabs";
import {
  PassChanger,
  ProfileChanger,
  OtherChanger,
  ThemeChanger,
} from "../components/Changer";
import Header from "../components/Header";
import Menu from "../components/Menu";

function Setting() {
  const [tabIndex, setTabIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const titles = ["プロフィール変更", "テーマ変更", "その他"];

  const user = useStoreState((state) => state.app.user);
  const revisit = useStoreActions((actions) => actions.app.revisit);
  useEffect(() => {
    revisit({ onSuccess: () => {}, onFailure: () => navigate("/login") });
  }, []);

  return (
    <Fragment>
      <Header>
        <button onClick={() => setMenuOpen(!menuOpen)}>menu</button>
      </Header>
      {menuOpen && <Menu closeHandler={() => setMenuOpen(false)} />}
      <h3>Mail</h3>
      <div>{user.mail}</div>
      <h3>Tabs</h3>
      <Tabs
        tabOnClick={(index) => setTabIndex(index)}
        {...{ titles, tabIndex }}
      />
      <h3>Panel</h3>
      {tabIndex === 0 && (
        <TabPanel>
          <ProfileChanger />
        </TabPanel>
      )}
      {tabIndex === 1 && (
        <TabPanel>
          <ThemeChanger />
        </TabPanel>
      )}
      {tabIndex === 2 && (
        <TabPanel>
          <OtherChanger />
        </TabPanel>
      )}
    </Fragment>
  );
}

export default Setting;
