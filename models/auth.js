const db = require("../db-config");

module.exports = {
  getById,
  getBy,
  addNewUser,
  deleteAllUsers,
  getByUserId,
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
    .select("username", "email", "userId", "id")
    .where({ id: id })
    .first();
}

function getByUserId(id) {
  return db("users")
    .select("username", "email", "userId", "id")
    .where({ userId: id })
    .first();
}


function getBy(filter) {
  return db("users")
    .select("username", "email", "userId", "password", "id")
    .where(filter)
    .first();
}

function deleteAllUsers(email) {
  return db("users")
    .where({ email: email })
    .del();  
}
