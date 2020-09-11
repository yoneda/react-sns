import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link, navigate } from "@reach/router";
import { useStoreActions } from "easy-peasy";
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

function Signup() {
  const createUser = useStoreActions((actions) => actions.app.signup);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const onFailure = (code) => {
    if (code === "EMAIL_ALREADY_EXIST") {
      return setServerError("このメールアドレスは既に登録されています");
    } else if (code === "TOO_SHORT_PASSWORD") {
      return setServerError("パスワードは8字以上で入力ください");
    }
    return setServerError("何らかのエラーが発生しました");
  };
  return (
    <Box>
      <Item>
        <Header>
          <h3>Sign up</h3>
        </Header>
        {serverError && <Error>{serverError}</Error>}
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
            setServerError("");
            if (email === "") {
              return setEmailError("メールアドレスが入力されていません");
            } else if (!isEmail(email)) {
              return setEmailError("メールアドレスの形式で入力してください");
            } else if (password === "") {
              return setPasswordError("パスワードを入力してください。");
            } else {
              createUser({
                email,
                password,
                onSuccess: () => navigate("/v0"),
                onFailure,
              });
            }
          }}
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
