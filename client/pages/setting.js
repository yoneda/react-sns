import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isEmpty } from "lodash";

const Setting = props => {
  const user = useStoreState(state => state.user.item);
  const [loadUser, updateUser] = useStoreActions(actions => [
    actions.user.get,
    actions.user.update
  ]);
  const [showStatus, setShowStatus] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    console.log("effect");
    if (isEmpty(user)) loadUser();
    else {
      setShowStatus(user.showStatus);
      setShowCalendar(user.showCalendar);
    }
  }, [user]);

  return (
    <div>
      <Header />
      <div>
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
    </div>
  );
};

export default Setting;
