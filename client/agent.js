import request from "superagent";

// APIとのI/Oなのでいち速くTS化したい

const base = "http://localhost:3000/api";

const Helth = {
  get: () => request.get(`${base}/helth`)
};

const Note = {
  get: account =>
    request
      .get(`${base}/notes`)
      .query({ account })
      .then(res => res.body), // TODO: ここで返り値の型を指定したいところ
  post: params =>
    request
      .post(`${base}/notes`)
      .send(params)
      .then(res => res.body), // TODO: ここで返り値の型を指定したいところ
  put: params => {
    const { id, title, body } = params;
    return request
      .put(`${base}/notes/${id}`)
      .send({ title, body })
      .then(res => res.body); // TODO: ここで返り値の型を指定したいところ
  }
};

const User = {
  get: () => {},
  put: () => {}
};

export default {
  Note,
  User
};
