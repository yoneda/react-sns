import React, { useState, Fragment } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isLength, isEmail } from "validator";
import { isEmpty } from "lodash";
import { redirectTo } from "@reach/router";

export const ThemeChanger = () => (
  <Fragment>
    <div>テーマ変更</div>
    <div>comming soon!</div>
  </Fragment>
);

export const ProfileChanger = () => {
  const user = useStoreState((state) => state.app.user);
  const updateProfile = useStoreActions((actions) => actions.app.updateProfile);
  const [bio, setBio] = useState(isEmpty(user) ? "" : user.bio);
  const onSuccess = () => redirectTo("/"); // TODO:成功したましたというToastを表示する

  return (
    <Fragment>
      <div>プロフィール変更</div>
      <input
        type="text"
        value={bio}
        placeholder="bio"
        onChange={(e) => setBio(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          updateProfile({ bio, onSuccess });
        }}
      >
        save
      </button>
    </Fragment>
  );
};

// TODO: メールアドレスの変更機能を実装
export const MailChanger = () => {
  const user = useStoreState((state) => state.app.user);
  const updateProfile = useStoreActions((actions) => actions.app.updateProfile);
  const [mail, setMail] = useState(isEmpty(user) ? "" : user.mail);
  const [error, setError] = useState("");
  const onSuccess = () => redirectTo("/"); // TODO:成功したましたというToastを表示する
  const errorOccured = (message) => {
    setError(message);
    setMail(user.mail);
  };

  return (
    <Fragment>
      <div>メールアドレス変更</div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input
        type="text"
        value={mail}
        placeholder="mail"
        onChange={(e) => setMail(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          if (isEmpty(mail))
            return errorOccured("メールアドレスを入力してください");
          if (!isEmail(mail))
            return errorOccured("メールアドレスの形式で入力ください");
          updateProfile({ mail, onSuccess });
        }}
      >
        save
      </button>
    </Fragment>
  );
};

export const PassChanger = () => {
  const [current, setCurrent] = useState("");
  const [future, setFuture] = useState("");
  const [futureAgain, setFutureAgain] = useState("");
  const [error, setError] = useState("");
  const user = useStoreState((state) => state.app.user);
  const updateProfile = useStoreActions((actions) => actions.app.updateProfile);
  const onSuccess = () => redirectTo("/"); // TODO:成功したましたというToastを表示する
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
            updateProfile({ pass: future, onSuccess });
        }}
      >
        save
      </button>
    </Fragment>
  );
};

export const OtherChanger = (props) => {
  const { showCalendar, showDateEditor, calendarStart } = useStoreState(
    (state) => state.app.user
  );
  const updateProfile = useStoreActions((actions) => actions.app.updateProfile);
  return (
    <Fragment>
      <div>その他</div>
      <div>カレンダーを表示</div>
      <input
        type="checkbox"
        checked={showCalendar}
        onChange={() => updateProfile({ showCalendar: !showCalendar })}
      />
      <div>日付変更可能か</div>
      <input
        type="checkbox"
        checked={showDateEditor}
        onChange={() => updateProfile({ showDateEditor: !showDateEditor })}
      />
      <div>カレンダーのはじまり</div>
      <input
        type="checkbox"
        checked={calendarStart === 0}
        onChange={() => updateProfile({ calendarStart: 0 })}
      />
      <span>日曜</span>
      <br />
      <input
        type="checkbox"
        checked={calendarStart === 1}
        onChange={() => updateProfile({ calendarStart: 1 })}
      />
      <span>月曜</span>
      <br />
    </Fragment>
  );
};
