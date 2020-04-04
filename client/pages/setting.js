import React, { useState, useEffect, useRef, Fragment } from "react";
import MenuAppBar from "../components/MenuAppBar";
import { Container } from "@material-ui/core";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import { Tabs, TabPanel } from "../components/Tabs";
import { isLength } from "validator";
import Router from "next/router";

const ThemeChanger = () => (
  <Fragment>
    <div>テーマ変更</div>
    <div>comming soon!</div>
  </Fragment>
);

const PassChanger = () => {
  const [current, setCurrent] = useState("");
  const [future, setFuture] = useState("");
  const [futureAgain, setFutureAgain] = useState("");
  const [error, setError] = useState("");
  const user = useStoreState((state) => state.user.item);
  const updateUser = useStoreActions((actions) => actions.user.update);
  const onSuccess = () => Router.push("/"); // TODO:成功したましたというToastを表示する
  const errorOccured = (message) => {
    setError(message);
    setCurrent("");
    setFuture("");
    setFutureAgain("");
  };

  return (
    <Fragment>
      <div>パスワード変更</div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input
        type="text"
        value={current}
        placeholder="current"
        onChange={(e) => setCurrent(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={future}
        placeholder="new"
        onChange={(e) => setFuture(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={futureAgain}
        placeholder="new again"
        onChange={(e) => setFutureAgain(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          if (current !== user.pass)
            return errorOccured("現在のパスワードが違います");
          if (future !== futureAgain)
            return errorOccured("新しいパスワードが一致しません");
          if (!isLength(future, { min: 4, max: 35 }))
            return errorOccured("パスワードは4字以上35字未満で入力ください");
          updateUser({ pass: future, onSuccess });
        }}
      >
        save
      </button>
    </Fragment>
  );
};

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
          {tabIndex === 0 && <TabPanel>aaa</TabPanel>}
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
