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

const ModalButton = styled.button`
  margin-top: 10px;
  width: 100%;
`;

const ModalInput = styled.input`
  box-sizing: border-box;
  margin-top: 10px;
  width: 100%;
`;

function PasswordForm(props) {
  const { onClose } = props;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const updateUser = useStoreActions((actions) => actions.app.updateUser);
  return (
    <div>
      <ModalInput
        type="text"
        placeholder="新パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <ModalInput
        type="text"
        placeholder="新パスワード再入力"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br />
      <ModalButton
        onClick={() => {
          // TODO: バリデーション
          if (password.length >= 8 && password === newPassword) {
            return updateUser({ password, onSuccess: onClose });
          }// TODO: バリデーション
          if (password.length >= 8 && password === newPassword) {
            return updateUser({ password, onSuccess: onClose });
          }
        }}
      >
        パスワードを変更
      </ModalButton>
    </div>
  );
}

function Setting() {
  const user = useStoreState((state) => state.app.user);
  const updateUser = useStoreActions((actions) => actions.app.updateUser);
  const deleteUser = useStoreActions((actions) => actions.app.deleteUser);
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
          <PasswordForm onClose={() => setIsPassword(false)} />
        </Modal>
      )}
      {isDelete && (
        <Modal onClose={() => setIsDelete(false)}>
          <div>
            アカウントを削除します。この操作によりあなたのアカウントは今後利用できなくなります。確認のためメールアドレスを入力してください。
          </div>
          {/* TODO: 削除後にログアウトする */}
          <Button onClick={() => deleteUser({ onSuccess: setIsDelete(false) })}>
            削除を実行
          </Button>
        </Modal>
      )}
    </Box>
  );
}

export default Setting;
