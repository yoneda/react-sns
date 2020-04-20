import request from "superagent";

// APIとのI/Oなのでいち速くTS化したい

const base = "http://localhost:3000/api";

const Helth = {
  get: () => request.get(`${base}/helth`),
};

const Note = {
  get: () => request.get(`${base}/notes`).then((res) => res.body), // TODO: ここで返り値の型を指定したいところ
  post: (params) =>
    request
      .post(`${base}/notes`)
      .send(params)
      .then((res) => res.body), // TODO: ここで返り値の型を指定したいところ
  put: (params) => {
    const { id, body } = params;
    return request
      .put(`${base}/notes/${id}`)
      .send({ body })
      .then((res) => res.body); // TODO: ここで返り値の型を指定したいところ
  },
};

const User = {
  get: () => request.get(`${base}/users`).then((res) => res.body[0]),
  post: ({ mail, pass }) =>
    request
      .post(`${base}/users`)
      .send({ mail, pass })
      .then((res) => res.body),
  put: (params) => {
    const { pass, bio, showCalendar, showDateEditor, calendarStart } = params;
    return request
      .put(`${base}/users`)
      .send({ pass, bio, showCalendar, showDateEditor, calendarStart })
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

const CheckAuth = () =>
  request
    .get(`${base}/checkAuth`)
    .then((res) => res.status === 200)
    .catch((err) => false);

export default {
  Helth,
  Note,
  User,
  CheckAuth,
};
