const express = require("express");
const {
  validateLoginData,
  validateSignupData,
} = require("../helpers/authValidator");
const { userExists } = require("../helpers/userExists");
const { registerUser, loginUser } = require("../services/auth");

const router = express.Router();

router.post("/register", validateSignupData, userExists, async (req, res) => {
  try {
    let user = req.body; // {username}
    const newUser = await registerUser(user);
    return res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/login", validateLoginData, async (req, res) => {
  try {
    const { body } = req;
    const result = await loginUser(body);
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
