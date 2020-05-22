const db = require("../db-config");

module.exports = {
  findValueById,
  findValues,
};

function findValues() {
  return db("values").select("id", "value_name", "description");
}

function findValueById(id) {
  return db("values")
    .select("id", "value_name", "description")
    .where({ id })
    .first();
}