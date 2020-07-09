const bcrypt = require("bcryptjs");
const { verifyUser, getBy, addNewUser, editUser } = require("../models/auth");
const {
  generateToken,
  generateVerificationToken,
} = require("../helpers/tokenGenerator");
const variables = require("../helpers/variables");

exports.registerUser = async (user) => {
  try {
    const { password } = user;

    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;
    user.jwt = generateVerificationToken(15, "12345abcde");
    const response = await addNewUser(user);
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
    // Get the email from the database
    const user = await getBy({ email });
    // if the password from the user input matches the one in the db
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      const { id, username } = user;
      return {
        id,
        username,
        email,
        token,
      };
    }
    return { message: "User email or password is incorrect!"};
  } catch (error) {
    console.log(error);
    return error;
  }
};


