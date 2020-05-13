const config = require("../knexfile");

// TODO: production/developモードで設定を変更する
const db = require("knex")(config.development);
// const db = require("knex")(config.production);
module.exports = db;
