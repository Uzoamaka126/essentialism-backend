const valuesData = require("../models/values");
const { getById } = require("../models/auth");
const usersData = require('../models/users');

exports.getValues = async () => {
  const allValues = await valuesData.findValues();

  if (!allValues) {
    return {
      statusCode: 404,
      data: {
        message: "Values not found",
      },
    };
  } 
  return {
    statusCode: 200,
    data: allValues,
  };
}

exports.getSingleValue = async (id) => {
  const value = await valuesData.findValueById(id);

  if (!value) {
    return {
      statusCode: 404,
      data: {
        message: "Value not found",
      },
    };
  } 
  return {
    statusCode: 200,
    data: value
  };
}

exports.fetchTopThreeValues = async (userId) => {
  if (!userId) {
    return {
      statusCode: 404,
      message: "No user id provided",
    };
  }

  const user = await getById(userId);

  if (!user) {
    return {
      statusCode: 404,
      message: "User does not exist",
    };
  }

  const values = await usersData.getUserValues(userId); 
  return {
    statusCode: 200,
    data: {
      items: values
    },
  };
};

exports.createUserTopThreeValues = async (data) => {
  const { user_id } = data;
  if (!user_id) {
    return {
      status: 404,
      message: "user id is missing",
    };
  };

  const response = await usersData.addUserValues(data);
  return {
    status: 200,
    type: "success",
    message: "Successful",
    data: {
      values: response
    },
  };
};

exports.removeUserTopThreeValues = async (id) => {
  if (!id) {
    return {
      status: 404,
      message: "value id is not provided",
    };
  }

  const response = await usersData.deleteUserValues(id);
  return {
    status: 200,
    type: "success",
    message: "Deleted Successfully"
  }
};

// module.exports = {
//   getValues,
//   getSingleValue,
//   // fetchTopThreeValues,
//   createUserTopThreeValues,
//   removeUserTopThreeValues
// };
