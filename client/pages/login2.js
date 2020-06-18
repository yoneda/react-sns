import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  width: 400px;
`;

function Login2() {
  return (
    <Box>
      <Item>
        login
      </Item>
    </Box>
  );
}

export default Login2;
