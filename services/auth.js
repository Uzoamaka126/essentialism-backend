const bcrypt = require("bcryptjs");
const { getBy, addNewUser, editUser } = require("../models/auth");
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
    const token = generateToken(response);
    const { id, username, email } = user;
    return {
      status: 201,
      type: "success",
      message: "Successful",
      data: {
        id,
        username,
        email,
        token,
      }
    };
  } catch (error) {
    return error.message;
  }
};

exports.loginUser = async (userData) => {
  const { email, password } = userData;
  try {
    const user = await getBy({ email });
    if (!user || user === undefined) {
      return { status: 404, message: "User does not exist!"};
    }
    // console.log(user)
    if (!user && !bcrypt.compareSync(password, user.password)) {
      return { status: 404, message: "User password is incorrect!"};
    } 
    if (!user.email) {
      return { type: 404, message: "User email"};
    }
    const token = generateToken(user);
    const { id, username } = user;
    return {
      status: 200,
      type: "success",
      message: "Successful",
      data: {
        id,
        username,
        email,
        token,
      }
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};


