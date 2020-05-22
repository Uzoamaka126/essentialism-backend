const db = require("../db-config");

module.exports = {
  get,
  findValuesByUserId,
  addUserValues,
  deleteUserValues,
  findUserById,
};

function get() {
  return db("users").select("id", "username", "email");
}

function findUserById(id) {
  return db("users").select("id", "username", "email").where({ id }).first();
}

async function findValuesByUserId(userId) {
  // return db("users_and_values as uv")
  //   .join("users as u", "u.id", "uv.userId")
  //   .select( "u.id", "uv.name", "u.username")
  //   .where({ "u.id": userId });
  try {
    const values = await db("users_and_values")
      .select("name")
      .where({ userId });
    return values;
  } catch (error) {
    console.log(error);
  }
}

async function findUsersByValues(id) {
  try {
    const response = await db("users_and_values")
      .where({ id: id })
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function addUserValues(values) {
  // return db("users_and_values as uv")
  //   .insert(values, "id")
  //   .join("users as u", "u.id", "uv.userId")
  //   .select("u.id", "uv.userId", "uv.username")
  //   .where({ "u.id": userId })
  //   .then((ids) => {
  //     return findUserById(ids[0]);
  //   });
  try {
    const [id] = await db("users_and_values").insert(values, "id");
    const response = await findUsersByValues(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

function deleteUserValues(userId, values) {
  return db("users_and_values as uv")
    .whereIn("name", values)
    .andWhere({ id: userId })
    .del();
}
