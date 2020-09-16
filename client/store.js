import { createStore, action, thunk, computed } from "easy-peasy";
import agent from "./agent";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

// TODO: store.js をモデルごとにファイルを分ける

const notes = {
  items: [],
  focus: {},
  index: computed((state) =>
    state.items.findIndex((note) => note.id === state.focus.id)
  ),
  numByDate: computed((state) => (date) =>
    state.items.reduce(
      (acc, note) =>
        dayjs(note.createdAt).isBetween(
          dayjs(`${date} 00:00:00`),
          dayjs(`${date} 23:59:59`)
        )
          ? acc + 1
          : acc,
      0
    )
  ),
  lightByDate: computed((state) => (date) => state.numByDate(date) > 0),
  set: action((state, payload) => {
    state.items = payload;
  }),
  setFocus: action((state, payload) => {
    state.focus = payload;
  }),
  setIndex: action((state, payload) => {
    state.index = payload;
  }),
  create: thunk(async (actions, payload) => {
    const { title, body, trashed, onSuccess } = payload;
    const reqBody = { note: { title, body, trashed } };
    await agent.Note.post({ reqBody });
    const notes = await agent.Note.get();
    actions.set(notes);
    actions.setFocus(notes[0]);
    if (onSuccess !== undefined) onSuccess();
  }),
  get: thunk(async (actions) => {
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
  remove: thunk(async (actions, payload) => {
    const { id, onSuccess } = payload;
    await agent.Note.remove({ id });
    const notes = await agent.Note.get();
    actions.set(notes);
    if (onSuccess !== undefined) onSuccess();
  }),
};

const trashed = {
  items: [],
  set: action((state, payload) => {
    return { ...state, items: payload };
  }),
  get: thunk(async (actions) => {
    const notes = await agent.Note.get({ trashed: 1 });
    actions.set(notes);
  }),
  restore: thunk(async (actions, payload) => {
    const { id } = payload;
    await agent.Note.restore({ id });
    const trashedNotes = await agent.Note.get({ trashed: 1 });
    actions.set(trashedNotes);
  }),
  remove: thunk(async (actions, payload) => {
    const { id } = payload;
    await agent.Note.remove({ id });
    const trashedNotes = await agent.Note.get({ trashed: 1 });
    actions.set(trashedNotes);
  }),
  tidyGarbage: thunk(async (actions) => {
    await agent.Note.tidyGarbage();
    const trashedNotes = await agent.Note.get({ trashed: 1 });
    actions.set(trashedNotes);
  }),
};

const app = {
  user: {},
  isLoggedIn: computed((state) => !isEmpty(state.user)),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  signup: thunk(async (actions, payload, { getStoreActions }) => {
    const { email, password, onSuccess, onFailure } = payload;
    // ユーザを作成
    const response = await agent.User.post({ user: { email, password } });
    // responseは成功したらユーザー情報を、失敗したらエラーコードの文字列を返す。
    if (typeof response === "string") {
      return onFailure(response);
    }
    actions.setUser(response);
    // ログイン情報をもったクッキーを取得
    const isSuccess = await agent.User.login({ user: { email, password } });
    // ノートを取得
    const notes = await agent.Note.get();
    getStoreActions().notes.set(notes);
    if (onSuccess !== undefined) onSuccess();
  }),
  login: thunk(async (actions, payload, { getStoreActions }) => {
    const { email, password, onSuccess, onFailure } = payload;
    // ログイン情報をもったクッキーを取得
    const response = await agent.User.login({
      user: { email, password },
    });
    // responseは成功したらtrueを、失敗したらエラーコードの文字列を返す。
    if (typeof response === "string") {
      return onFailure();
    }
    // ユーザを取得
    const user = await agent.User.get();
    actions.setUser(user);
    // ノートを取得
    const notes = await agent.Note.get();
    getStoreActions().notes.set(notes);
    // ゴミ箱にあるノートを取得
    const trashedNotes = await agent.Note.get({ trashed: 1 });
    getStoreActions().trashed.set(trashedNotes);
    if (onSuccess !== undefined) onSuccess();
  }),
  revisit: thunk(async (actions, payload, { getStoreActions }) => {
    // ユーザが再訪したか(認証情報をもつクッキーが存在しているか)
    const isAuthed = await agent.CheckAuth();
    // ユーザを取得
    const user = await agent.User.get();
    actions.setUser(user);
    // ノートを取得
    const notes = await agent.Note.get();
    getStoreActions().notes.set(notes);
    // ゴミ箱にあるノートを取得
    const trashedNotes = await agent.Note.get({ trashed: 1 });
    getStoreActions().trashed.set(trashedNotes);
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
    if (onSuccess !== undefined) onSuccess();
  }),
  updateUser: thunk(async (actions, payload) => {
    const { name, password, showCalendar, onSuccess } = payload;
    const reqBody = { user: { name, password, showCalendar } };
    const user = await agent.User.put(reqBody);
    actions.setUser(user);
    if (onSuccess !== undefined) onSuccess();
  }),
  deleteUser: thunk(async (actions, payload) => {
    const { onSuccess } = payload;
    await agent.User.delete();
    if (onSuccess !== undefined) onSuccess();
  }),
};

const store = createStore({ notes, trashed, app });

export default store;
