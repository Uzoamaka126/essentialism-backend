const db = require("../db-config");

module.exports = {
  get,
  findValuesByUserId,
  addUserValues,
  deleteUserValues,
  findUserById,
  editUser,
  getUserValues,
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

async function editUser(data) {
  try {
    const user = await db("users")
      .select("id", "username", "email")
      .where({ id: data.id })
      .update("username", data.username);
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
    const response = await db("users_values").where({ id: id }).first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function addUserValues(values) {
  try {
    const [id] = await db("users_values").insert(values, "id");
    const response = await findUsersByValues(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getUserValues(id) {
  try {
    const values = await db("users_values as uv")
      .join("users as u", "u.id", "uv.user_id")
      .join("values as v", "v.id", "uv.value_id")
      .select("uv.id", "uv.user_id", "uv.value_id")
      .where({ "uv.user_id": id });
      // .limit(3);
    return values;
  } catch (error) {
    console.log(error);
  }
}

function deleteUserValues(id) {
  return db("users_values as uv")
    .where({ id: id })
    .del();
}
