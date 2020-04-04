import React, { useState, Fragment } from "react";
import MenuAppBar from "../components/MenuAppBar";
import { Container } from "@material-ui/core";
import { Tabs, TabPanel } from "../components/Tabs";
import {
  ThemeChanger,
  PassChanger,
  MailChanger,
  ProfileChanger,
  OtherChanger,
} from "../components/Changer";

const Setting = (props) => {
  // MEMO: 複雑さ回避のため、userはホームで読み込まれてる前提で進める
  const [tabIndex, setTabIndex] = useState(0);
  const titles = [
    "メールアドレス",
    "パスワード",
    "プロフィール",
    "テーマ変更",
    "その他",
  ];
  return (
    <Fragment>
      <MenuAppBar />
      <Container>
        <h2>設定</h2>
        <Tabs
          tabOnClick={(index) => setTabIndex(index)}
          {...{ titles, tabIndex }}
        />
        <br />
        {tabIndex === 0 && (
          <TabPanel>
            <MailChanger />
          </TabPanel>
        )}
        {tabIndex === 1 && (
          <TabPanel>
            <PassChanger />
          </TabPanel>
        )}
        {tabIndex === 2 && (
          <TabPanel>
            <ProfileChanger />
          </TabPanel>
        )}
        {tabIndex === 3 && (
          <TabPanel>
            <ThemeChanger />
          </TabPanel>
        )}
        {tabIndex === 4 && (
          <TabPanel>
            <OtherChanger />
          </TabPanel>
        )}
      </Container>
    </Fragment>
  );
};

export default Setting;
