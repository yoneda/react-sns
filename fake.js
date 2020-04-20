const dayjs = require("dayjs");

const randDatetime = () =>
  dayjs()
    .subtract(Math.floor(Math.random() * 60), "day")
    .format("YYYY-M-D H:mm:ss");

const fake = {
  users: [
    {
      id: 1,
      mail: "yoneda@yoneda.com",
      pass: "yoneda",
      showCalendar: true,
      showDateEditor: false,
      calendarStart: 0, // TODO: 0:日曜はじまり、1:月曜はじまりだと定義。あとで詳しく調べて修正する。
      bio: "hello",
    },
    {
      id: 2,
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
      id: 1,
      body: "text text text",
      createdAt: randDatetime(),
      updatedAt: randDatetime(),
      user: 1
    },
    {
      id: 2,
      body: "text text text 2",
      createdAt: randDatetime(),
      updatedAt: randDatetime(),
      user: 1
    },
    {
      id: 3,
      body: "text text text",
      createdAt: randDatetime(),
      updatedAt: randDatetime(),
      user: 2
    }
  ]
};

module.exports = fake;
