const usersData = require("../models/users");

exports.fetchUsers = async () => {
  const allUsers = await usersData.get();

  if (!allUsers) {
    return {
      statusCode: 404,
      data: {
        message: "Values not found",
      },
    };
  } else {
    return {
      statusCode: 200,
      data: allUsers,
    };
  }
};

exports.fetchSingleUser = async (id) => {
  const user = await usersData.findUserById(id);

  if (!user) {
    return {
      statusCode: 404,
      data: {
        message: "User not found",
      },
    };
  } else {
    return {
      statusCode: 200,
      data: {
        data: user,
      },
    };
  }
}

exports.fetchUserValues = async (id) => {
  const values = await usersData.findValuesByUserId(id);

  if (!values) {
    return {
      statusCode: 404,
      data: {
        message: "User values not found",
        values
      },
    };
  } else {
    return {
      statusCode: 200,
      data: values
    };
  }
};

exports.addSingleUserValues = async (values) => {
  const valuesData = await usersData.addUserValues(values);

  if (!valuesData) {
    return {
      statusCode: 404,
      data: {
        message: "User values could not be added",
      },
    };
  } else {
    return {
      statusCode: 200,
      data: valuesData,
    };
  }
};

// async function addUserValuesById(values) {
//   const newValues = await valuesData.addUserValues(values);
//   return newValues;
// }

// async function getValuesByUserId(id) {
//   const values = await valuesData.findValuesByUserId(id);
//   return values;
// }

// async function removeUserValues(userId, values) {
//   const response = await valuesData.deleteUserValues(userId, values);
//   return response;
// }
