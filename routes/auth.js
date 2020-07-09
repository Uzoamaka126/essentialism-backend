const express = require("express");
const {
  validateLoginData,
  validateSignupData,
} = require("../helpers/authValidator");
const { userExists } = require("../helpers/userExists");
const { registerUser, loginUser } = require("../services/auth");
const EmailValidator = require("email-validator");
const variables = require("../helpers/variables");
const router = express.Router();

router.post("/register", validateSignupData, userExists, async (req, res) => {
  try {
    // const { username, email, password } = req.body;
    let user = req.body; // {username}
    if (!user.email || !EmailValidator.validate(user.email)) {
      return res
        .status(400)
        .send({ auth: false, message: "Email is required" });
    }
    if (!user.password) {
      return res
        .status(400)
        .send({ auth: false, message: "Password is required" });
    }
    if (!user.username) {
      return res
        .status(400)
        .send({ auth: false, message: variables.missingUsername });
    }

    // const user = {
    //   username,
    //   email,
    //   password
    // }

    const response = await registerUser(user);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/login", validateLoginData, async (req, res) => {
  try {
    // const { body } = req;
    const { email, password } = req.body;
    // const result = await loginUser(body);
    // chck if email is valid or given
    if (!email || !EmailValidator.validate(email)) {
      return res.status(400).send({
        auth: false,
        message: "Email is required or malformed",
      });
    }
    // check if password is given
    if (!password) {
      return res.status(400).send({
        auth: false,
        message: "Password is required",
      });
    }

    const user = await loginUser({ email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
