import { createStore, action, thunk, computed } from "easy-peasy";
import agent from "./agent";
import { isEmpty } from "lodash";

const notes = {
  items: [
    {
      id: 1,
      title: "unde facilis magni",
      body:
        "Beatae fugit voluptatibus possimus sed reiciendis. Minima dolor nihil.",
      trashed: 0,
      createdAt: "2020-5-16 16:22:53",
      updatedAt: "2020-5-24 16:22:53",
      user: 1,
    },
    {
      id: 2,
      title: "expedita assumenda earum",
      body:
        "Similique ad magni omnis. Nemo consequatur et culpa iusto. Eum perspiciatis omnis hic voluptatem ex. Porro commodi atque autem.",
      trashed: 0,
      createdAt: "2020-5-4 16:22:53",
      updatedAt: "2020-5-9 16:22:53",
      user: 1,
    },
    {
      id: 3,
      title: "tempora corporis est",
      body:
        "Voluptatum quidem repellendus. Totam pariatur voluptatem veniam esse mollitia cumque aut voluptas. Autem non distinctio non est fugit laudantium quibusdam. Natus fugit ut velit hic. Quo modi ea officiis vero omnis. Quia unde pariatur dolorem commodi ea optio rem.",
      trashed: 0,
      createdAt: "2020-5-11 16:22:53",
      updatedAt: "2020-5-6 16:22:53",
      user: 1,
    },
    {
      id: 4,
      title: "in minima velit",
      body:
        "Et quo odio dolor quo qui dolore excepturi explicabo unde. Labore illo nesciunt architecto quasi veritatis. Cumque sed voluptatem voluptate dolorem tempore laudantium soluta et omnis.",
      trashed: 0,
      createdAt: "2020-4-26 16:22:53",
      updatedAt: "2020-6-4 16:22:53",
      user: 1,
    },
    {
      id: 5,
      title: "porro non suscipit",
      body:
        "Debitis qui deserunt dolor et aut enim. Itaque ut autem non accusantium provident ipsam. Voluptatem aperiam deserunt eos ex. Illo harum ullam quis. Et ratione consequuntur.",
      trashed: 0,
      createdAt: "2020-4-27 16:22:53",
      updatedAt: "2020-5-2 16:22:53",
      user: 1,
    },
    {
      id: 6,
      title: "quibusdam maiores pariatur",
      body:
        "Hic voluptatem nam id odit ut in quasi voluptatem. Voluptatum eaque velit ut officiis temporibus. Vel id ipsum. Natus velit est asperiores consectetur nulla.",
      trashed: 0,
      createdAt: "2020-4-25 16:22:53",
      updatedAt: "2020-4-29 16:22:53",
      user: 1,
    },
    {
      id: 7,
      title: "accusamus sed quibusdam",
      body:
        "Sunt omnis placeat quae ut voluptate. Aut cupiditate consequatur tempore vel cumque natus. Distinctio fugiat deserunt maiores quia recusandae. Dolores officia deserunt laudantium.",
      trashed: 0,
      createdAt: "2020-4-22 16:22:53",
      updatedAt: "2020-5-27 16:22:53",
      user: 1,
    },
    {
      id: 8,
      title: "sunt voluptas aut",
      body:
        "Odio minus accusamus iure mollitia qui non sit. Dolores vero rerum quia qui. Nihil excepturi eligendi animi quis voluptate delectus et saepe.",
      trashed: 0,
      createdAt: "2020-5-30 16:22:53",
      updatedAt: "2020-4-25 16:22:53",
      user: 1,
    },
    {
      id: 9,
      title: "molestiae eveniet iusto",
      body: "Dolore quod id at ad aut. Quo culpa sint rerum sit ipsum.",
      trashed: 0,
      createdAt: "2020-4-21 16:22:53",
      updatedAt: "2020-5-12 16:22:53",
      user: 1,
    },
    {
      id: 10,
      title: "perspiciatis iusto sed",
      body:
        "Rerum qui eaque rerum ut eum commodi. Maxime quaerat et et nisi. Fuga alias nemo aut dolore iusto nihil et odit. Aliquid ex expedita incidunt voluptatem blanditiis labore. Quis odio et voluptatem. Est omnis illo iste.",
      trashed: 0,
      createdAt: "2020-4-22 16:22:53",
      updatedAt: "2020-4-28 16:22:53",
      user: 1,
    },
  ],
  create: thunk(async (actions, payload, { getState }) => {
    const { body, onSuccess } = payload;
    const note = await agent.Note.post({ body });
    const { items } = getState();
    actions.set([...items, note]);
    onSuccess();
  }),
  get: thunk(async (actions, payload) => {
    const notes = await agent.Note.get();
    actions.set(notes);
  }),
  update: thunk(async (actions, payload) => {
    const { id, body, onSuccess } = payload;
    await agent.Note.put({ id, body });
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
  updateProfile: thunk(async (actions, payload) => {
    const {
      pass,
      bio,
      showCalendar,
      showDateEditor,
      calendarStart,
      onSuccess,
    } = payload;
    const user = await agent.User.put({
      pass,
      bio,
      showCalendar,
      showDateEditor,
      calendarStart,
    });
    actions.setUser(user);
    onSuccess();
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
};
const store = createStore({ notes, app });

export default store;
