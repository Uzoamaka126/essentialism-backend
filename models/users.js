const db = require("../db-config");

module.exports = {
  get,
  findValuesByUserId,
  addUserValues,
  deleteUserValues,
  findUserById,
  editUser,
};

async function get() {
  try {
    const values = await db("users").select("id", "username", "email");
    return values;
  } catch (error) {
    console.log(error);
  }
}

async function findUserById(id) {
  try {
    const response = await db("users")
      .select("id", "username", "email")
      .where({ id })
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function editUser(userData, id) {
  try {
    const user = await db("users").where({ id: id }).update(userData);
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function findValuesByUserId(userId) {
  try {
    const response = await db("users_plus_values")
      .select("name")
      .where({ userId });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function findUsersByValues(id) {
  try {
    const response = await db("users_plus_values").where({ id: id }).first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function addUserValues(values) {
  try {
    const [id] = await db("users_plus_values").insert(values, "id");
    const response = await findUsersByValues(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

function deleteUserValues(userId, values) {
  return db("users_plus_values as uv")
    .whereIn("name", values)
    .andWhere({ id: userId })
    .del();
}