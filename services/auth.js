const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const {
  getBy,
  addNewUser,
  // editUser,
  deleteAllUsers,
} = require("../models/auth");
const {
  generateToken,
  generateVerificationToken,
} = require("../helpers/tokenGenerator");

async function comparePasswords(plainTextPassword, hash) {
  return await bcrypt.compare(plainTextPassword, hash);
}

exports.registerUser = async (user) => {
  try {
    const { password, email } = user;
    const checkForUser = await getBy({ email });
    if (checkForUser) {
      return {
        status: 200,
        isSuccessful: false,
        message: "User already exists",
      };
    }
    user.userId = uuidv4();
    user.id = Math.floor(Math.random() * 1000000000);
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;
    user.jwt = generateVerificationToken(15, "12345abcde");
    const response = await addNewUser(user);
    const token = generateToken(response);
    if (!token) {
      return {
        status: 200,
        isSuccessful: false,
        message: "Operation failed",
      };
    }
    const { username, userId, id } = user;
    return {
      status: 201,
      isSuccessful: true,
      message: "Operation Successful",
      data: {
        username,
        email,
        token,
        userId,
        id,
      },
    };
  } catch (error) {
    return error.message;
  }
};

exports.loginUser = async (userData) => {
  const { email, password } = userData;
  if (!email) {
    return {
      status: 200,
      isSuccessful: false,
      message: "Email is required.",
    };
  }

  if (!password) {
    return {
      status: 200,
      isSuccessful: false,
      message: "Password is required.",
    };
  }
  try {
    const user = await getBy({ email });
    if (!user) {
      return {
        status: 200,
        isSuccessful: false,
        message: "User does not exist",
      };
    }

    const passwordCheck = await comparePasswords(password, user.password);
    if (!passwordCheck) {
      return {
        status: 200,
        isSuccessful: false,
        message: "Incorrect password",
      };
    }
    const token = generateToken(user);
    if (!token) {
      return {
        status: 200,
        isSuccessful: false,
        message: "Operation failed",
      };
    }
    const { userId, username, id } = user;
    return {
      status: 200,
      isSuccessful: true,
      message: "Operation Successful",
      data: {
        userId,
        username,
        email,
        token,
        id,
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
