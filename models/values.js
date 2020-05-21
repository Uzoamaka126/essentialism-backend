const db = require("../db-config");

module.exports = {
  findValuesByUserId,
  findValueById,
  findValues,
  addUserValues,
  deleteUserValues,
};

function findValues() {
  return db("values").select("id", "value_name");
}

function findValueById(id) {
  return db("values").select("id", "value_name").where({ id }).first();
}

function findUserById(id) {
  return db("users").select("id").where({ id }).first();
}

function findValuesByUserId(userId) {
  return db("users_values as uv")
    .join("users as u", "u.id", "uv.user_id")
    .join("values as v", "v.id", "uv.value_id")
    .select("v.id", "u.id", "v.value_name", "u.fullname")
    .where({ "u.id": userId });
}

function addUserValues(values, userId) {
  return db("users_values as uv")
    .insert(values, "id")
    .select("users as u", "u.id", "uv.user_id")
    .select("values as v", "v.id", "uv.value_id")
    .where({ "u.id": userId })
    .then((ids) => {
      return findUserById(ids[0]);
    });
}

function deleteUserValues(userId, values) {
  return db("users_values as uv")
    .whereIn("value_name", values)
    .andWhere({ id: userId })
    .del();
}
