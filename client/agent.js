import request from "superagent";

// APIとのI/Oなのでいち速くTS化したい

const base = "http://localhost:3000/api";

const Helth = {
  get: () => request.get(`${base}/helth`),
};

const Note = {
  get: (account) =>
    request
      .get(`${base}/notes`)
      .query({ account })
      .then((res) => res.body), // TODO: ここで返り値の型を指定したいところ
  post: (params) =>
    request
      .post(`${base}/notes`)
      .send(params)
      .then((res) => res.body), // TODO: ここで返り値の型を指定したいところ
  put: (params) => {
    const { id, title, body } = params;
    return request
      .put(`${base}/notes/${id}`)
      .send({ title, body })
      .then((res) => res.body); // TODO: ここで返り値の型を指定したいところ
  },
};

const User = {
  get: (account) => request.get(`${base}/users`).then((res) => res.body[0]),
  put: (params) => {
    const {
      account,
      mail,
      pass,
      bio,
      showCalendar,
      showDateEditor,
      calendarStart,
    } = params;
    return request
      .put(`${base}/users/${account}`)
      .send({ mail, pass, bio, showCalendar, showDateEditor, calendarStart })
      .then((res) => res.body[0]);
  },
  login: function (params) {
    const { mail, pass } = params;
    return request
      .post(`${base}/users/login`)
      .send({ mail, pass })
      .then((res) => res.status === 200);
  },
  logout: () =>
    request.post(`${base}/users/logout`).then((res) => res.status === 200),
};

export default {
  Helth,
  Note,
  User,
};
