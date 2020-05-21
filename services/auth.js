const bcrypt = require("bcryptjs");
const { verifyUser, getBy, addNewUser, get } = require("../models/auth");
const {
  generateToken,
  generateVerificationToken,
} = require("../helpers/tokenGenerator");

exports.registerUser = async (user) => {
  try {
    const { password } = user;
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;
    user.jwt = generateVerificationToken(15, "12345abcde");

    const response = await addNewUser(user);
    console.log(response);
    const token = generateToken(response);

    return {
      response,
      token,
    };
  } catch (error) {
    return error.message;
  }
};

exports.loginUser = async (userData) => {
  const { email, password } = userData;

  try {
    // Get the email in the database
    const user = await getBy({ email });
    // if the password from the user input matches the one in the db
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      return {
        email,
        token,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

exports.fetchUsers = async () => {
  const allUsers = await get();

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
      data: allUsers
    };
  }
}