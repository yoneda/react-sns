const request = require("superagent");

const port = process.env.PORT || 3000;
const base = `http://localhost:${port}/api`;

/*
// TODO: typescriptで返り値の型を指定したい
const Note = {
  get: () => request.get(`${base}/notes`).then((res) => res.body),
  post: ({ body }) =>
    request
      .post(`${base}/notes`)
      .send({ body })
      .then((res) => res.body),
  put: ({ id, body }) =>
    request
      .put(`${base}/notes/${id}`)
      .send({ id, body })
      .then((res) => res.body),
};

const User = {
  get: () => request.get(`${base}/users`).then((res) => res.body[0]),
  post: function ({ email, password }) {
    return request
      .post(`${base}/users`)
      .send({ user: { email, password } })
      .then((res) => res.bpdy);
  },
  put: ({ password, bio, showCalendar, showDateEditor, calendarStart }) =>
    request
      .put(`${base}/users`)
      .send({ password, bio, showCalendar, showDateEditor, calendarStart })
      .then((res) => res.body[0]),
  login: ({ email, password }) =>
    request
      .post(`${base}/users/login`)
      .send({ user: { email, password } })
      .then((res) => res.status === 200),
  logout: () =>
    request.post(`${base}/users/logout`).then((res) => res.status === 200),
};

const CheckAuth = () =>
  request
    .get(`${base}/checkAuth`)
    .then((res) => res.status === 200)
    .catch(() => false);

const CheckHelth = () => request.get(`${base}/helth`);

export default {
  Note,
  User,
  CheckAuth,
  CheckHelth,
};
*/

const Note = {
  get: function () {
    return request.get(`${base}/notes`).then((res) => res.body.notes);
  },
  put: ({id, reqBody}) =>
    request
      .put(`${base}/notes/${id}`)
      .send(reqBody)
      .then((res) => res.body),
};

const User = {
  get: function () {
    return request.get(`${base}/users`).then((res) => res.body.user);
  },
  login: function (reqBody) {
    return request
      .post(`${base}/users/login`)
      .send(reqBody)
      .then((res) => res.status === 200);
  },
};

const CheckHelth = function () {
  return request.get(`${base}/helth`);
};

module.exports = {
  CheckHelth,
  User,
  Note,
};
