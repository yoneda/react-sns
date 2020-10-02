import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import Icon from "./NewIcon";

const Box = styled.div`
  height: 60px;
  width: 200px;
  padding: 5px;
  box-sizing: border-box;
`;

const Button = styled.button`
  height: 50px;
  width: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NewButton() {
  const createNote = useStoreActions((actions) => actions.notes.create);
  return (
    <Box>
      <Button
        onClick={() =>
          createNote({
            body: "",
            trashed: false,
            onSuccess: () => {},
          })
        }
      >
        <Icon />
        New
      </Button>
    </Box>
  );
}

export default NewButton;
