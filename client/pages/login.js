import React, { useState } from "react";
import styled from "styled-components";
import { useStoreActions } from "easy-peasy";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";

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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const doLogin = useStoreActions((actions) => actions.app.login);
  const onSuccess = () => navigate("/v0");
  return (
    <Box>
      <Item>
        <Header>
          <h3>Sign in</h3>
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
        <Button onClick={() => doLogin({ email, password, onSuccess })}>
          ログインする
        </Button>
        <div>または</div>
        <Button>Googleで続ける</Button>
        <div>
          アカウントをお持ちでないですか？
          <br />
          <Link to="../signup">こちら</Link>から新規登録できます。
        </div>
      </Item>
    </Box>
  );
}

export default Login;
