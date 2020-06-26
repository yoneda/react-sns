import React, { useState } from "react";
import styled from "styled-components";
import { Link, navigate } from "@reach/router";
import { useStoreActions } from "easy-peasy";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  width: 400px;
`;

const Input = styled.input`
  width: 400px;
  box-sizing: border-box;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 400px;
  margin-top: 10px;
`;

const Header = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Signup() {
  const createUser = useStoreActions((actions) => actions.app.signup);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Box>
      <Item>
        <Header>
          <h3>Sign up</h3>
        </Header>
        <Input
          type="text"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input type="text" placeholder="パスワード再入力" />
        <Button
          onClick={() =>
            createUser({ email, password, onSuccess: () => navigate("/") })
          }
        >
          登録する
        </Button>
        <div>または</div>
        <Button>Googleで続ける</Button>
        <div>
          すでにアカウントをお持ちですか？
          <br />
          お持ちの場合は<Link to="../login">こちら</Link>からログインできます。
        </div>
      </Item>
    </Box>
  );
}

export default Signup;
