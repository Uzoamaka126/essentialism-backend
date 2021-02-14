const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const {
  getBy,
  addNewUser,
  editUser,
  deleteAllUsers,
} = require("../models/auth");
const {
  generateToken,
  generateVerificationToken,
} = require("../helpers/tokenGenerator");

exports.registerUser = async (user) => {
  try {
    const { password } = user;

    user.userId = uuidv4();
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;
    user.jwt = generateVerificationToken(15, "12345abcde");
    const response = await addNewUser(user);
    const token = generateToken(response);
    const { username, email, userId } = user;
    return {
      status: 201,
      type: "success",
      message: "Successful",
      data: {
        username,
        email,
        token,
        userId,
      },
    };
  } catch (error) {
    return error.message;
  }
};

exports.loginUser = async (userData) => {
  const { email, password } = userData;
  try {
    const user = await getBy({ email });
    if (!user || typeof user === "undefined") {
      return { status: 404, message: "User does not exist!" };
    }
    // console.log(user)
    if (!user && !bcrypt.compareSync(password, user.password)) {
      return { status: 404, message: "Password is incorrect!" };
    }
    const token = generateToken(user);
    const { userId, username } = user;
    return {
      status: 200,
      type: "success",
      message: "Successful",
      data: {
        userId,
        username,
        email,
        token,
      },
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.deleteAllUsersService = async (email) => {
  try {
    const user = await getBy({ email });
    if (!user || typeof user === "undefined") {
      return { status: 404, message: "User does not exist!" };
    }

    const response = await deleteAllUsers(email);
    if (!response) {
      return {
        status: 200,
        isSuccessful: false,
      };
    }
    return {
      status: 200,
      isSuccessful: true,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
