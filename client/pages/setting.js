import React, { useState, Fragment } from "react";
import { Tabs, TabPanel } from "../components/Tabs";
import {
  ThemeChanger,
  PassChanger,
  MailChanger,
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
    "メールアドレス",
    "パスワード",
    "プロフィール",
    "テーマ変更",
    "その他",
  ];
  const renderContent = (index) => {
    const contents = [
      <MailChanger />,
      <PassChanger />,
      <ProfileChanger />,
      <ThemeChanger />,
      <OtherChanger />,
    ];
    return contents[index];
  };
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
      <TabPanel>{renderContent(tabIndex)}</TabPanel>
    </Fragment>
  );
};

export default Setting;
