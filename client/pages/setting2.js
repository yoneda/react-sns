import React, { useState } from "react";
import Modal from "../components/Modal";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";

const Box = styled.div`
  padding: 60px;
`;

const Button = styled.button`
  margin-top: 10px;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin-top: 10px;
`;

const InputCheck = styled.input``;

function PasswordForm() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const updateUser = useStoreActions((state) => state.app.updateUser);
  return (
    <div>
      <Input
        type="text"
        placeholder="新パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Input
        type="text"
        placeholder="新パスワード再入力"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br />
      <Button
        onClick={() => {
          // TODO: バリデーション
          if (password.length >= 8 && password === newPassword) {
            return updateUser({ password });
          }
        }}
      >
        パスワードを変更
      </Button>
    </div>
  );
}

function Setting2() {
  const user = useStoreState((state) => state.app.user);
  const updateUser = useStoreActions((state) => state.app.updateUser);
  const [name, setName] = useState(user.name);
  const [isPassword, setIsPassword] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  return (
    <Box>
      <div>名前</div>
      <Input
        type="text"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <Button onClick={() => updateUser({ name })}>変更する</Button>
      <br />
      <br />
      <div>パスワード</div>
      <Button onClick={() => setIsPassword(true)}>パスワードを修正</Button>
      <br />
      <br />
      <div>アカウント削除</div>
      <Button onClick={() => setIsDelete(true)}>削除を実行</Button>
      <br />
      <br />
      <div>カレンダー</div>
      <div>
        表示する
        <Input
          type="checkbox"
          checked={user.showCalendar}
          onChange={() => updateUser({ showCalendar: !user.showCalendar })}
        />
      </div>
      {isPassword && (
        <Modal onClose={() => setIsPassword(false)}>
          <PasswordForm />
        </Modal>
      )}
      {isDelete && (
        <Modal onClose={() => setIsDelete(false)}>
          <div>
            アカウントを削除します。この操作によりあなたのアカウントは今後利用できなくなります。確認のためメールアドレスを入力してください。
          </div>
          <Button>削除を実行</Button>
        </Modal>
      )}
    </Box>
  );
}

export default Setting2;
