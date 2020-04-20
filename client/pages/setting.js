import React, { useState, useEffect, Fragment } from "react";
import { useStoreActions } from "easy-peasy";
import { navigate } from "@reach/router";
import { Tabs, TabPanel } from "../components/Tabs";
import {
  PassChanger,
  ProfileChanger,
  OtherChanger,
} from "../components/Changer";
import Header from "../components/Header";
import Menu from "../components/Menu";

const Setting = (props) => {
  // MEMO: 複雑さ回避のため、userはホームで読み込まれてる前提で進める
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const titles = [
    "パスワード",
    "プロフィール",
    "その他",
    "テーマ変更",
    "メールアドレス",
  ];

  const revisit = useStoreActions((actions) => actions.app.revisit);
  useEffect(() => {
    revisit({ onSuccess: () => {}, onFailure: () => navigate("/login") });
  }, []);

  return (
    <Fragment>
      <Header>
        <button onClick={() => setOpen(!open)}>add</button>
        <button onClick={() => setMenuOpen(!menuOpen)}>menu</button>
      </Header>
      {menuOpen && <Menu closeHandler={() => setMenuOpen(false)} />}
      <h3>Tabs</h3>
      <Tabs
        tabOnClick={(index) => setTabIndex(index)}
        {...{ titles, tabIndex }}
      />
      <h3>Panel</h3>
      {tabIndex === 0 && (
        <TabPanel>
          <PassChanger />
        </TabPanel>
      )}
      {tabIndex === 1 && (
        <TabPanel>
          <ProfileChanger />
        </TabPanel>
      )}
      {tabIndex === 2 && (
        <TabPanel>
          <OtherChanger />
        </TabPanel>
      )}
      {tabIndex === 3 && (
        <TabPanel>
          <div>テーマ変更</div>
          <div>comming soon!</div>
        </TabPanel>
      )}
      {tabIndex === 4 && (
        <TabPanel>
          <div>メールアドレス</div>
          <div>comming soon!</div>
        </TabPanel>
      )}
    </Fragment>
  );
};

export default Setting;
