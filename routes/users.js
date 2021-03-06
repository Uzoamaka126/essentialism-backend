const express = require("express");
const {
  fetchUsers,
  fetchSingleUser,
  editUserInfo,
} = require("../services/users");
const { validate } = require("../helpers/protectedMiddleware");
const router = express.Router();

router.patch("/edit", validate, async (req, res) => {
  try {
    const { id } = req.body;
    const { body } = req;

    if (!id) {
      return res.status(404).send("An id is required");
    }

    const response = await editUserInfo(body);
    if (!response) {
      res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", validate, async (req, res) => {
  try {
    const result = await fetchUsers();
    if (!result) {
      return res.status(200).json({
        message: "Operation Successful",
        isSuccessful: false,
        data: result,
      });
    }
    return res.status(200).json({
      message: "Operation Successful",
      isSuccessful: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/getSingleUser", validate, async (req, res) => {
  try {
    const result = await fetchSingleUser(req.body.id);

    return res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
