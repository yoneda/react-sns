import { createStore, action, thunk, computed } from "easy-peasy";
import request from "superagent";

const page = {
  load: thunk(async (actions, payload, { getStoreActions }) => {
    await getStoreActions().notes.get();
    await getStoreActions().user.get();
  })
};

const notes = {
  items: [],
  get: thunk(async (actions, payload) => {
    const notes = await request
      .get("http://localhost:3000/api/notes")
      .query({ account: "yoneda" })
      .then(res => res.body);
    actions.set(notes);
  }),
  set: action((state, payload) => {
    state.items = payload;
  })
};

const user = {
  item: {},
  get: thunk(async (actions, payload) => {
    const user = await request
      .get("http://localhost:3000/api/users/yoneda")
      .then(res => res.body[0]);
    actions.set(user);
  }),
  set: action((state, payload) => {
    state.item = payload;
  })
};

const store = createStore({ page, user, notes });

export default store;
