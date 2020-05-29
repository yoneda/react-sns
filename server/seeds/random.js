import faker from "faker";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

const NUM_USERS = 10;
const NUM_NOTES = 365;

// TODO: 時刻までランダムにする
// TODO: ランダムの性能を高める
const randDatetime = function () {
  return dayjs()
    .subtract(Math.floor(Math.random() * 60), "day")
    .format("YYYY-M-D H:mm:ss");
};

const seed = async function (knex) {
  console.log("accounts");
  for (let index = 0; index < NUM_USERS; index++) {
    const email = faker.internet.email();
    const passwordRaw = faker.internet.password();
    console.log(`email: ${email}`);
    console.log(`passwordRaw: ${passwordRaw}\n`);
    const hashed = await bcrypt.hash(passwordRaw, 12);
    const [userId] = await knex("users").insert({
      email,
      password: hashed,
      name: faker.name.firstName(),
      showCalendar: true,
      createdAt: randDatetime(),
      updatedAt: randDatetime(),
    });
    for (let noteIndex = 0; noteIndex < NUM_NOTES; noteIndex++) {
      await knex("notes").insert({
        title: faker.lorem.words(),
        body: faker.lorem.sentences(),
        trashed: false,
        createdAt: randDatetime(),
        updatedAt: randDatetime(),
        user: userId,
      });
    }
  }
};

export { seed };
