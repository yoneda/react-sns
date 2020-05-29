exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("email");
      table.string("password");
      table.string("name");
      table.boolean("showCalendar");
      table.datetime("createdAt");
      table.datetime("updatedAt");
    })
    .createTable("notes", (table) => {
      table.increments("id");
      table.string("title");
      table.string("body");
      table.boolean("trashed");
      table.datetime("createdAt");
      table.datetime("updatedAt");
      table.integer("user");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("notes");
};
