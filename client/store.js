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
  create: thunk(async (actions, payload, { getState }) => {
    const { account, title, body, onSuccess} = payload;
    const note = await request
      .post("http://localhost:3000/api/notes")
      .send({ account, title, body })
      .then(res => res.body);
    const { items } = getState();
    actions.set([...items, note]);
    onSuccess();
  }),
  get: thunk(async (actions, payload) => {
    const notes = await request
      .get("http://localhost:3000/api/notes")
      .query({ account: "yoneda" })
      .then(res => res.body);
    actions.set(notes);
  }),
  update: thunk(async (actions, payload) => {
    const { id, title, body, onSuccess } = payload;
    console.log(payload);
    const note = request
      .put(`http://localhost:3000/api/notes/${id}`)
      .send({ title, body })
      .then(res => res.body);
    const notes = await request
      .get("http://localhost:3000/api/notes")
      .query({ account: "yoneda" })
      .then(res => res.body);
    actions.set(notes);
    onSuccess();
  }),
  set: action((state, payload) => {
    // return { ...state, items: payload };
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
  update: thunk(async (actions, payload) => {
    const { showStatus, showCalendar } = payload;
    const user = request
      .put("http://localhost:3000/api/users/yoneda")
      .send({ showStatus, showCalendar })
      .then(res => res.body[0]);
    actions.set(user);
  }),
  set: action((state, payload) => {
    return { ...state, item: payload };
  })
};

const store = createStore({ page, user, notes });

export default store;
