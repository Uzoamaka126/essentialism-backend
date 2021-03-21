const valuesData = require("../models/values");
const { getById } = require("../models/auth");
const usersData = require("../models/users");

async function getValues() {
  const allValues = await valuesData.findValues();
  if (!allValues) {
    return {
      status: 200,
      isSuccessful: false,
      message: "Values not found",
    };
  }
  return {
    status: 200,
    isSuccessful: true,
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
    data: value,
  };
}

async function fetchTopThreeValues(userId) {
  if (!userId) {
    return {
      status: 404,
      message: "No user id provided",
    };
  }

  const user = await getById(userId);
  if (!user) {
    return {
      status: 404,
      message: "User does not exist",
    };
  }

  const response = await usersData.getUserValues(userId);
  if (!response) {
    return {
      status: 200,
      isSuccessful: false,
      data: response,
    };
  }
  return {
    status: 200,
    data: {
      response,
    },
  };
}

async function createUserTopThreeValues(data) {
  const { userId, valueId, topValuesId } = data;
  if (!userId) {
    return {
      status: 404,
      message: "user id is missing",
    };
  }
  const checkforUserId = await getById(userId);
  if (!checkforUserId) {
    return {
      status: 404,
      message: "user id is not valid",
    };
  }

  const checkForValueId = await valuesData.findValueById(valueId);
  if (!checkForValueId) {
    return {
      status: 404,
      message: "value does not exist",
    };
  }

  const response = await usersData.addUserValues({
    userId,
    valueId,
    topValuesId,
  });

  if (!response) {
    return {
      status: 200,
      isSuccessful: false,
      data: response,
    };
  }
  return {
    status: 200,
    isSuccessful: true,
    data: response,
  };
}

async function removeUserTopThreeValues(userId, id) {
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
    message: "Deleted Successfully",
  };
}

module.exports = {
  getValues,
  getSingleValue,
  fetchTopThreeValues,
  createUserTopThreeValues,
  removeUserTopThreeValues,
};
