import React, { useState, Fragment, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

export function Theme() {
  return (
    <Fragment>
      <div>テーマ変更</div>
      <div>comming soon!</div>
    </Fragment>
  );
}

export function Profile() {
  const user = useStoreState((state) => state.app.user);
  const updateProfile = useStoreActions((actions) => actions.app.updateProfile);
  const [bio, setBio] = useState("");
  const onSuccess = () => alert("プロフィールが更新されました");

  useEffect(() => {
    if (user.bio) setBio(user.bio);
  }, [user]);

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
}

export function Other() {
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
}
