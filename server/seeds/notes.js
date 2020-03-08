import fake from "../../fake";

exports.seed = knex =>
  knex("notes")
    .del()
    .then(() => knex("notes").insert(fake.notes));
