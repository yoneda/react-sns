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

function Signup2() {
  return (
    <Box>
      <Item>
        sign up
      </Item>
    </Box>
  );
}

export default Signup2;
