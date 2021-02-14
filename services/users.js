const usersData = require("../models/users");

exports.fetchUsers = async () => {
  const allUsers = await usersData.get();
  return allUsers;
};

exports.fetchSingleUser = async (id) => {
  const user = await usersData.findUserById(id);
  if (!user) {
    return { statusCode: 404, data: { message: "User does not exist" } };
  }
  return { statusCode: 200, data: user };
};

exports.editUserInfo = async (data) => {
  const { id } = data
  try {
    const checkForUser = await usersData.findUserById(id);
    if (!checkForUser) {
      return { statusCode: 404, data: { message: "User does not exist" } };
    }
    const user = await usersData.editUser(data);
    return {
      statusCode: 200,
      data: {
        user
      },
    }
  } catch (error) {
    console.log(error);
    return error.message;
  }
};