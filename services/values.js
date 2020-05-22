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
  const value = await valuesData.findValueById(id);

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

module.exports = {
  getValues,
  getSingleValue,
};
