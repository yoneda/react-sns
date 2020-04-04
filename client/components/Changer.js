import React, { useState, Fragment } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { isLength, isEmail } from "validator";
import { isEmpty } from "lodash";
import Router from "next/router";

export const ThemeChanger = () => (
  <Fragment>
    <div>テーマ変更</div>
    <div>comming soon!</div>
  </Fragment>
);

export const ProfileChanger = () => {
  const user = useStoreState((state) => state.user.item);
  const [bio, setBio] = useState(isEmpty(user) ? "" : user.bio);
  const updateUser = useStoreActions((actions) => actions.user.update);
  const onSuccess = () => Router.push("/"); // TODO:成功したましたというToastを表示する

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
          updateUser({ bio, onSuccess });
        }}
      >
        save
      </button>
    </Fragment>
  );
};

export const MailChanger = () => {
  const user = useStoreState((state) => state.user.item);
  const [mail, setMail] = useState(isEmpty(user) ? "" : user.mail);
  const [error, setError] = useState("");
  const updateUser = useStoreActions((actions) => actions.user.update);
  const onSuccess = () => Router.push("/"); // TODO:成功したましたというToastを表示する
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
          updateUser({ mail, onSuccess });
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
