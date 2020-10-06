import React from "react";
import { storiesOf } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { ListPanel } from "../client/components/ListPanel";

export default {
  title: "ListPanel",
};

const notes = [
  {
    id: 1,
    title: "aaa",
    body: "bbb",
    createdAt: "2020-10-10 10:10:00",
  },
  {
    id: 2,
    title: "aaa",
    body: "bbb",
    createdAt: "2020-10-10 10:10:00",
  },
  {
    id: 3,
    title: "aaa",
    body: "bbb",
    createdAt: "2020-10-10 10:10:00",
  },
];

const setFocus = payload => action(`payload is ${payload}`);
const index = 1;
export const blank = () => <ListPanel {...{ notes, index, setFocus }} />;
storiesOf("Test", module)
  .add("normal test",()=><Test text={"test"} />)
  .add("advanced test",()=><Test text={"advanced"} />)