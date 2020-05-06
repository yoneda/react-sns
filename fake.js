const dayjs = require("dayjs");

const randDatetime = () =>
  dayjs()
    .subtract(Math.floor(Math.random() * 60), "day")
    .format("YYYY-M-D H:mm:ss");

const fake = {
  users: [
    {
      mail: "yoneda@yoneda.com",
      pass: "yoneda",
      showCalendar: true,
      showDateEditor: false,
      calendarStart: 0, // TODO: 0:日曜はじまり、1:月曜はじまりだと定義。あとで詳しく調べて修正する。
      bio: "hello",
    },
    {
      mail: "tanaka@tanaka.com",
      pass: "tanaka",
      showCalendar: true,
      showDateEditor: false,
      calendarStart: 0,
      bio: "hi",
    }
  ],
  notes: [
    {
      body: "text text text",
      createdAt: randDatetime(),
      updatedAt: randDatetime(),
      user: 1
    },
    {
      body: "text text text 2",
      createdAt: randDatetime(),
      updatedAt: randDatetime(),
      user: 1
    },
    {
      body: "text text text",
      createdAt: randDatetime(),
      updatedAt: randDatetime(),
      user: 2
    }
  ]
};

module.exports = fake;
