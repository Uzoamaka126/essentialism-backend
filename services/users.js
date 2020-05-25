const usersData = require("../models/users");

exports.fetchUsers = async () => {
  const allUsers = await usersData.get();
  return allUsers;
};

exports.fetchSingleUser = async (id) => {
  const user = await usersData.findUserById(id);
  return user;
};

exports.editUserInfo = async (userData, id) => {
  try {
    const user = await usersData.editUser(userData, id);
    if (!user) {
      return { statusCode: 404, data: { message: "User does not exist" } };
    } else {
      return {
        statusCode: 200,
        data: {
          user,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

exports.fetchUserValues = async (id) => {
  const values = await usersData.findValuesByUserId(id);
  if (!values) {
    return {
      statusCode: 404,
      data: { message: "No interests found", values },
    };
  } else {
    return { statusCode: 200, data: { values } };
  }
};

exports.addSingleUserValues = async (values) => {
  const valuesData = await usersData.addUserValues(values);
  return valuesData;
};

// async function removeUserValues(userId, values) {
//   const response = await valuesData.deleteUserValues(userId, values);
//   return response;
// }
