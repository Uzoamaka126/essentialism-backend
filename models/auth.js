const db = require("../db-config");

module.exports = {
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

function getById(id) {
  return db("users")
    .select("id", "username", "email", "jwt", "isVerified")
    .where({ id: id })
    .first();
}

function getBy(filter) {
  return db("users")
    .select("id", "username", "isVerified", "password", "email")
    .where(filter)
    .first();
}
