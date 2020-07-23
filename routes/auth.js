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
    const user = req.body;
    // check if email is valid or given
    if (!user.email) {
      return res.status(400).send({
        auth: false,
        message: "Email is required",
      });
    }
    // check if password is given
    if (!user.password) {
      return res.status(400).send({
        auth: false,
        message: "Password is required",
      });
    }

    const response = await loginUser(user);
    if (!response) {
      return res.status(400).send({
        auth: false,
        message: "Email or password is wrong",
      });
    }
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
