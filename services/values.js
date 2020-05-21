const valuesData = require("../models/values");

async function getValues() {
  const allValues = await valuesData.getValues();

  if (!allValues) {
    return {
      statusCode: 404,
      data: {
        message: "Values not found",
      },
    };
  } else {
    return {
      statusCode: 200,
      data: {
        data: allValues,
      },
    };
  }
}

async function getSingleValue(id) {
  const value = await valuesData.getValueById(id);

  if (!value) {
    return {
      statusCode: 404,
      data: {
        message: "Value not found",
      },
    };
  } else {
    return {
      statusCode: 200,
      data: {
        data: value,
      },
    };
  }
}

async function addUserValuesById(values) {
  const newValues = await valuesData.addUserValues(values);
  return newValues;
}

async function getValuesByUserId(id) {
  const values = await valuesData.findValuesByUserId(id);
  return values;
}

async function removeUserValues(userId, values) {
  const response = await valuesData.deleteUserValues(userId, values);
  return response;
}

module.exports = {
  getValues,
  getSingleValue,
  addUserValuesById,
  removeUserValues,
  getValuesByUserId,
};
