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
    const values = await db("users").select("userId", "username", "email", "id");
    return values;
  } catch (error) {
    console.log(error);
  }
}

async function findUserById(id) {
  try {
    const response = await db("users")
      .select("userId", "username", "email")
      .where({ userId: id })
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function editUser(data) {
  try {
    const user = await db("users")
      .select("userId", "username", "email")
      .where({ userId: data.id })
      .update("username", data.username);
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function findValuesByUserId(id) {
  try {
    const response = await db("top_three_values as ttv")
    .join("users as u", "u.id", "ttv.userId")
    .join("values as v", "v.id", "ttv.valueId")
    .select(
      "ttv.id", 
      "u.userId", 
      "ttv.userId", 
      "ttv.valueId",
      "v.value_name", 
      "v.description", 
      "topValuesId"
    )
      .where({ "ttv.id" : id })
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function addUserValues(value) {
  try {
    const ids = await db("top_three_values as ttv")
      .insert(value, "id")
      .join("users as u", "ttv.userId", "u.id")
      .join("values as v", "ttv.valueId", "v.id")
      .where({ "u.id": value.userId, "v.id": value.valueId });
    const id = ids[0];
    const response = await findValuesByUserId(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getUserValues(id) {
  try {
    const values = await db("top_three_values as ttv")
      .join("users as u", "ttv.userId", "u.id")
      .join("values as v", "ttv.valueId", "v.id")
      .select(
        "ttv.id", 
        "u.userId", 
        "ttv.userId", 
        "ttv.valueId",
        "v.value_name", 
        "v.description", 
        "topValuesId"
      )
      .where({ "u.id": id })
      .limit(3);
    return values;
  } catch (error) {
    console.log(error);
  }
}

function deleteUserValues(userId, id) {
  try {
    return db("users_plus_values as tv")
      .where({ "tv.userId": userId, "id": id })
      .del();
  } catch (error) {
    console.log(error);
  }
}