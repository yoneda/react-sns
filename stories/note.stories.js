import React from "react";
import { action } from "@storybook/addon-actions";
import Note from "../client/components/Note";

export default {
  title: "Note",
};

export const blank = () => <Note />;

export const normal = () => (
  <Note
    title="my title"
    body="text text text"
    onEdit={action("クリックされた")}
  />
);