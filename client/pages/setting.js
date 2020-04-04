import React, { useState, useEffect, useRef, Fragment } from "react";
import MenuAppBar from "../components/MenuAppBar";
import { Container } from "@material-ui/core";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import { Tabs, TabPanel } from "../components/Tabs";
import { ThemeChanger, PassChanger, MailChanger } from "../components/Changer";

const Setting = (props) => {
  const user = useStoreState((state) => state.user.item);
  const [loadUser, updateUser] = useStoreActions((actions) => [
    actions.user.get,
    actions.user.update,
  ]);
  const [showStatus, setShowStatus] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (isEmpty(user)) loadUser();
    else {
      setShowStatus(user.showStatus);
      setShowCalendar(user.showCalendar);
    }
  }, [user]);

  const [tabIndex, setTabIndex] = useState(0);

  const titles = [
    "メールアドレス",
    "パスワード",
    "プロフィール",
    "テーマ変更",
    "その他",
  ];
  return (
    <div>
      <MenuAppBar />
      <Container>
        <div>
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
          {tabIndex === 2 && <TabPanel>ccc</TabPanel>}
          {tabIndex === 3 && (
            <TabPanel>
              <ThemeChanger />
            </TabPanel>
          )}
          {tabIndex === 4 && <TabPanel>eee</TabPanel>}
          <div>Show status:</div>
          <input
            type="checkbox"
            checked={showStatus}
            onChange={() => setShowStatus(!showStatus)}
          />
        </div>
        <div>
          <div>Show calendar:</div>
          <input
            type="checkbox"
            checked={showCalendar}
            onChange={() => setShowCalendar(!showCalendar)}
          />
        </div>
        <button onClick={() => updateUser({ showStatus, showCalendar })}>
          save
        </button>
      </Container>
    </div>
  );
};

export default Setting;
