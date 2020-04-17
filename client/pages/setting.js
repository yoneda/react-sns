import React, { useState, Fragment } from "react";
import { Tabs, TabPanel } from "../components/Tabs";
import {
  ThemeChanger,
  PassChanger,
  MailChanger,
  ProfileChanger,
  OtherChanger,
} from "../components/Changer";
import AppWrapper from "../components/AppWrapper";

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
      <AppWrapper>
          <h3>Tabs</h3>
          <Tabs
            tabOnClick={(index) => setTabIndex(index)}
            {...{ titles, tabIndex }}
          />
          <h3>Panel</h3>
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
      </AppWrapper>
    </Fragment>
  );
};

export default Setting;
