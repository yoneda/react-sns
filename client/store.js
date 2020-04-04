import { createStore, action, thunk, computed } from "easy-peasy";
import agent from "./agent";

const notes = {
  items: [],
  create: thunk(async (actions, payload, { getState }) => {
    const { account, title, body, onSuccess } = payload;
    const note = await agent.Note.post({ account, title, body });
    const { items } = getState();
    actions.set([...items, note]);
    onSuccess();
  }),
  get: thunk(async (actions, payload) => {
    const notes = await agent.Note.get("yoneda");
    actions.set(notes);
  }),
  update: thunk(async (actions, payload) => {
    const { id, title, body, onSuccess } = payload;
    await agent.Note.put({ id, title, body });
    const notes = await agent.Note.get("yoneda");
    actions.set(notes);
    if (onSuccess !== undefined) onSuccess();
  }),
  set: action((state, payload) => {
    return { ...state, items: payload };
  }),
};

const user = {
  item: {},
  get: thunk(async (actions, payload) => {
    const user = await agent.User.get("yoneda");
    actions.set(user);
  }),
  update: thunk(async (actions, payload) => {
    const {
      mail,
      pass,
      bio,
      showCalendar,
      showDateEditor,
      calendarStart,
      onSuccess,
    } = payload;
    const user = await agent.User.put({
      account: "yoneda",
      mail,
      pass,
      bio,
      showCalendar,
      showDateEditor,
      calendarStart,
    });
    actions.set(user);
    if (onSuccess !== undefined) onSuccess();
  }),
  set: action((state, payload) => {
    return { ...state, item: payload };
  }),
};

const store = createStore({ user, notes });

export default store;
