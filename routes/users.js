const express = require("express");
const {
  fetchUsers,
  fetchSingleUser,
  fetchUserValues,
  addUserValues,
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

    const response = await editUserInfo(body);
    if (!response) {
      res.status(404).json(response);
    };

    return res.status(200).json(response);
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

// @TODO: Add top three user values
router.post("/values/create", validate, async (req, res, next) => {
  const values = req.body.values;
  try {
    const userId = req.user.subject;
    values.map(value => {
      addUserValues({ value_id: value, user_id: userId })
    })
    res.status(200).json({ message: "Added"});
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @TODO: Fetch top three user values
router.get("/values/fetch", validate, async (req, res) => {
  try {
    const id = req.user.subject;
    const result = await fetchUserValues(id);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
