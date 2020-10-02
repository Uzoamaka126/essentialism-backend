const valuesData = require("../models/values");
const { getById } = require("../models/auth");
const usersData = require('../models/users');

async function getValues() {
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

async function getSingleValue(id) {
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

async function fetchTopThreeValues(userId) {
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

async function createUserTopThreeValues (data) {
  const { userId } = data;
  if (!userId) {
    return {
      status: 404,
      message: "user id is missing",
    };
  };
  const checkforId = await getById(userId);
  if(!checkforId) {
    return {
      status: 404,
      message: "user id is not valid",
    };
  }

  const newTopValues = await usersData.addUserValues(data);
  return newTopValues;
};

async function removeUserTopThreeValues (userId, id) {
  if (!id || !userId) {
    return {
      status: 404,
      message: "value or user id is not provided",
    };
  }

  const response = await usersData.deleteUserValues(userId, id);
  return {
    status: 200,
    type: "success",
    message: "Deleted Successfully"
  }
};

module.exports = {
  getValues,
  getSingleValue,
  fetchTopThreeValues,
  createUserTopThreeValues,
  removeUserTopThreeValues
};
