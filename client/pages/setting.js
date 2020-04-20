import React, { useState, useEffect, Fragment } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { navigate } from "@reach/router";
import { Tabs, TabPanel } from "../components/Tabs";
import { Profile, Other, Theme } from "../components/Changer";
import Header from "../components/Header";
import Menu from "../components/Menu";

function Setting() {
  const user = useStoreState((state) => state.app.user);
  const revisit = useStoreActions((actions) => actions.app.revisit);
  useEffect(() => {
    revisit({ onSuccess: () => {}, onFailure: () => navigate("/login") });
  }, []);

  const [tabIndex, setTabIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const titles = ["プロフィール変更", "テーマ変更", "その他"];

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
          <Profile />
        </TabPanel>
      )}
      {tabIndex === 1 && (
        <TabPanel>
          <Theme />
        </TabPanel>
      )}
      {tabIndex === 2 && (
        <TabPanel>
          <Other />
        </TabPanel>
      )}
    </Fragment>
  );
}

export default Setting;
