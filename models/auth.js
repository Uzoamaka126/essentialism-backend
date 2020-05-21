const db = require("../db-config");

module.exports = {
  get,
  getById,
  getBy,
  addNewUser,
};

async function addNewUser(user) {
  try {
    const ids = await db("users").insert(user, "id");
    const id = ids[0];
    const response = await getById(id);
    return response;
  } catch (err) {
    console.log(err);
  }
}

function get() {
  return db("users").select("id", "fullname", "email");
}

function getById(id) {
  return db("users")
    .select("id", "fullname", "email", "jwt", "isVerified")
    .where({ id: id })
    .first();
}

function getBy(filter) {
  return db("users")
    .select("id", "fullname", "isVerified", "password", "email")
    .where(filter)
    .first();
}
