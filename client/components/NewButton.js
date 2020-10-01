import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import NewIcon from "./NewIcon";

const NewButtonBox = styled.button`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NewButton() {
  const createNote = useStoreActions((actions) => actions.notes.create);
  return (
    <NewButtonBox
      onClick={() =>
        createNote({
          body: "",
          trashed: false,
          onSuccess: () => {},
        })
      }
    >
      <NewIcon />
      New
    </NewButtonBox>
  );
}

export default NewButton;
