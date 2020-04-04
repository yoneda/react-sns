import React, { useState, useEffect, useRef } from "react";
import MenuAppBar from "../components/MenuAppBar";
import { Container } from "@material-ui/core";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";
import { Tabs } from "../components/Tabs";

const Setting = props => {
  const user = useStoreState(state => state.user.item);
  const [loadUser, updateUser] = useStoreActions(actions => [
    actions.user.get,
    actions.user.update
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
    "その他"
  ];

  return (
    <div>
      <MenuAppBar />
      <Container>
        <div>
          <Tabs
            tabOnClick={index => setTabIndex(index)}
            {...{ titles, tabIndex }}
          />
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
