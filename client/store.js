import { createStore, action, thunk, computed } from "easy-peasy";
import agent from "./agent";
import { isEmpty } from "lodash";

const notes = {
  items: [],
  create: thunk(async (actions, payload, { getState }) => {
    const { title, body, onSuccess } = payload;
    const reqBody = { note: { title, body } };
    await agent.Note.post({ reqBody });
    const notes = await agent.Note.get();
    actions.set(notes);
    onSuccess();
  }),
  get: thunk(async (actions, payload) => {
    const notes = await agent.Note.get();
    actions.set(notes);
  }),
  update: thunk(async (actions, payload) => {
    const { id, title, body, onSuccess } = payload;
    const reqBody = { note: { title, body } };
    await agent.Note.put({ id, reqBody });
    const notes = await agent.Note.get();
    actions.set(notes);
    if (onSuccess !== undefined) onSuccess();
  }),
  set: action((state, payload) => {
    return { ...state, items: payload };
  }),
};

const app = {
  user: {},
  editor: {},
  isLoggedIn: computed((state) => !isEmpty(state.user)),
  signup: thunk(async (actions, payload, { getStoreActions }) => {
    const { email, password, onSuccess } = payload;
    // ユーザを作成
    const user = await agent.User.post({ email, password });
    actions.setUser(user);
    // ログイン情報をもったクッキーを取得
    const isSuccess = await agent.User.login({ email, password });
    // ノートを取得
    const notes = await agent.Note.get();
    getStoreActions().notes.set(notes);
    onSuccess();
  }),
  login: thunk(async (actions, payload, { getStoreActions }) => {
    const { email, password, onSuccess } = payload;
    // ログイン情報をもったクッキーを取得
    const isSuccess = await agent.User.login({ user: { email, password } });
    if (!isSuccess) return;
    // ユーザを取得
    const user = await agent.User.get();
    actions.setUser(user);
    // ノートを取得
    const notes = await agent.Note.get();
    const setNotes = getStoreActions().notes.set;
    setNotes(notes);
    onSuccess();
  }),
  revisit: thunk(async (actions, payload, { getStoreActions }) => {
    const { onSuccess, onFailure } = payload;
    // ユーザが再訪したか(認証情報をもつクッキーが存在しているか)
    const isAuthed = await agent.CheckAuth();
    if (!isAuthed) return onFailure();
    // ユーザを取得
    const user = await agent.User.get();
    actions.setUser(user);
    // ノートを取得
    const notes = await agent.Note.get();
    const setNotes = getStoreActions().notes.set;
    setNotes(notes);
    onSuccess();
  }),
  logout: thunk(async (actions, payload, { getStoreActions }) => {
    const { onSuccess } = payload;
    // クッキーを削除
    const isSuccess = await agent.User.logout();
    if (!isSuccess) return;
    // ユーザを削除
    actions.setUser({});
    // ノートを削除
    getStoreActions().notes.set([]);
    onSuccess();
  }),
  updateUser: thunk(async (actions, payload) => {
    const { name, password, showCalendar } = payload;
    const reqBody = { user: { name, password, showCalendar } };
    const user = await agent.User.put(reqBody);
    console.log(user);
    actions.setUser(user);
    // onSuccess();
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  setEditor: action((state, payload) => {
    state.editor = payload;
  }),
};
const store = createStore({ notes, app });

export default store;
