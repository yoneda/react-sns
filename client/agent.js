import request from "superagent";
import { pick } from "lodash";

const port = process.env.PORT || 3000;
// const base = `http://localhost:${port}/api`;
const base = "https://simple-diary-app.herokuapp.com/api";

const CheckHelth = function () {
  return request.get(`${base}/helth`);
};

const CheckAuth = function () {
  return request
    .get(`${base}/checkAuth`)
    .then((res) => res.status === 200)
    .catch(() => false);
};

const Note = {
  get: function (reqQuery) {
    const query = pick(reqQuery, ["trashed", "limit"]);
    return request
      .get(`${base}/notes`)
      .query(query)
      .then((res) => res.body.notes);
  },
  put: function ({ id, reqBody }) {
    return request
      .put(`${base}/notes/${id}`)
      .send(reqBody)
      .then((res) => res.body);
  },
  post: function ({ reqBody }) {
    return request
      .post(`${base}/notes`)
      .send(reqBody)
      .then((res) => res.body);
  },
  remove: function ({ id }) {
    return request.delete(`${base}/notes/${id}`).then((res) => res.body);
  },
  trash: function ({ id }) {
    return request.put(`${base}/notes/${id}/trash`).then((res) => res.body);
  },
  restore: function ({ id }) {
    return request.put(`${base}/notes/${id}/restore`).then((res) => res.body);
  },
  tidyGarbage: function () {
    return request.delete(`${base}/notes/garbage`);
  },
};

const User = {
  get: function () {
    return request.get(`${base}/users`).then((res) => res.body.user);
  },
  post: function (reqBody) {
    return request
      .post(`${base}/users`)
      .send(reqBody)
      .then((res) => res.body.user)
      .catch((err) => {
        const response = JSON.parse(err.response.text);
        return response.code;
      });
  },
  login: function (reqBody) {
    return request
      .post(`${base}/users/login`)
      .send(reqBody)
      .then((res) => res.status === 200)
      .catch((err) => {
        const response = JSON.parse(err.response.text);
        return response.code;
      });
  },
  logout: function () {
    return request
      .post(`${base}/users/logout`)
      .then((res) => res.status === 200);
  },
  put: function (reqBody) {
    return request
      .put(`${base}/users`)
      .send(reqBody)
      .then((res) => res.body.user);
  },
  delete: function () {
    return request.delete(`${base}/users`).then((res) => res.body);
  },
};

module.exports = {
  CheckAuth,
  CheckHelth,
  User,
  Note,
};
