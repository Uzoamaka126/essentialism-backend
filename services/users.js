const { getById } = require("../models/auth");
const usersData = require("../models/users");

exports.fetchUsers = async () => {
  const allUsers = await usersData.get();
  return allUsers;
};

exports.fetchSingleUser = async (id) => {
  if (!id) {
    return {
      status: 404,
      isSuccessful: false,
      message: "Id is required",
    };
  }
  const user = await getById(id);
  if (!user) {
    return {
      status: 200,
      isSuccessful: false,
      message: "User does not exist",
    };
  }
  return {
    status: 200,
    isSuccessful: true,
    message: "Operation successful",
    data: user,
  };
};

exports.editUserInfo = async (data) => {
  const { id } = data;
  try {
    const checkForUser = await usersData.findUserById(id);
    if (!checkForUser) {
      return { statusCode: 404, data: { message: "User does not exist" } };
    }
    const user = await usersData.editUser(data);
    return {
      statusCode: 200,
      data: {
        user,
      },
    };
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
