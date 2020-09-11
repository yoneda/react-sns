import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useStoreActions } from "easy-peasy";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import { isEmail } from "validator";

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
  outline: none; /* :focus時に水色の枠線が表示されるのを防ぐ */
  ${(props) =>
    props.isError &&
    css`
      border: red solid 2px;
    `}
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

const Error = styled.div`
  color: red;
  margin: 5px;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
          isError={emailError !== ""}
        />
        {emailError && <Error>{emailError}</Error>}
        <Input
          type="text"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isError={passwordError !== ""}
        />
        {passwordError && <Error>{passwordError}</Error>}
        <Button
          onClick={() => {
            setEmailError("");
            setPasswordError("");
            if (email === "") {
              return setEmailError("メールアドレスが入力されていません");
            } else if (!isEmail(email)) {
              return setEmailError("メールアドレスの形式で入力してください");
            } else if (password === "") {
              return setPasswordError("パスワードを入力してください。");
            } else {
              doLogin({ email, password, onSuccess });
            }
          }}
        >
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
