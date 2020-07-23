const valuesData = require("../models/values");

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

module.exports = {
  getValues,
  getSingleValue,
};
