// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3"
    },
    migrations: {
      directory: "server/migrations"
    },
    seeds:{
      directory: "server/seeds"
    }
  },

  // TODO: stagning環境をつくるなら適切に設定する
  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: 'localhost',
      database: "diary",
      user: "yoneda",
      password: "qweewqq"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "server/migrations"
    },
    seeds:{
      directory: "server/seeds"
    }
  }
};
