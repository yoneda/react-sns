import fake from "../../fake";
import bcrypt from "bcrypt";

exports.seed = async function (knex) {
  let users = [];
  for(const user of fake.users){
    user.pass = await bcrypt.hash(user.pass,12);
    users.push(user);
  }
  console.log(users);
  await knex("users").del();
  await knex("users").insert(users);
};
