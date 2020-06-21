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

function Setting2() {
  const user = useStoreState((state) => state.app.user);
  const updateUser = useStoreActions((state) => state.app.updateUser);
  const [name, setName] = useState(user.name);
  const [open, setOpen] = useState(true);
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
      <Input type="text" placeholder="旧パスワード" />
      <br />
      <Input type="text" placeholder="新パスワード" />
      <br />
      <Input type="text" placeholder="新パスワード再入力" />
      <br />
      <Button>パスワードを修正</Button>
      <br />
      <br />
      <div>アカウント削除</div>
      <Button>削除を実行</Button>
      <br />
      <br />
      <div>カレンダー</div>
      <div>
        表示する
        <InputCheck type="radio" />
      </div>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div>aaaa</div>
          <div>bbbb</div>
          <div>cccc</div>
        </Modal>
      )}
    </Box>
  );
}

export default Setting2;
