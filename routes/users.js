const express = require("express");
const {
  fetchUsers,
  fetchSingleUser,
  fetchUserValues,
  addSingleUserValues,
  editUserInfo
} = require("../services/users");
const { validate } = require("../helpers/protectedMiddleware");
const router = express.Router();

router.get("/", validate, async (req, res) => {
  try {
    const result = await fetchUsers();
    res.status(200).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

router.patch("/edit", validate, async (req, res) => {
  try {
    const { id } = req.body;
    const { body } = req;
    if(!id) {
      return res.status(404).send("An id is required")
    }
    const response = await editUserInfo(body, id);
    if (response) {
      res.status(200).json(response);
    } else {
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", validate, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await fetchSingleUser(id);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
