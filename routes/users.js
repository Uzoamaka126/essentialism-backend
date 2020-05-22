const express = require("express");
const {
  fetchUsers,
  fetchSingleUser,
  fetchUserValues,
  addSingleUserValues,
} = require("../services/users");
const { authenticate } = require("../helpers/isLoggedIn");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { body } = req;
    const result = await fetchUsers();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await fetchSingleUser(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/userValues", authenticate, async (req, res, next) => {
  const { values } = req.body;
  try {
    const userId = req.user.subject;
    values.map((value) => {
      addSingleUserValues({ name: value, userId });
    });
    return res.status(201).json({ message: "Successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/userValues", authenticate, async (req, res, next) => {
  try {
    const userId = req.user.subject;
    const response = await fetchUserValues(userId);
    res.status(200).json({ message: "Success", response });
    return response;
  } catch (error) {
    next(error);
  }
});

router.delete("/:id/values", authenticate, async (req, res, next) => {
  const values = req.body;
  try {
    const userId = req.user.subject;
    const remove = await service.removeUserValues(userId, values);
    const response = await service.getValuesByUserId(userId);
    if (remove === values.length) {
      return res.status(200).json({
        message: "Successfully deleted",
        userId,
        deleted: values,
        new: response,
      });
    } else {
      return res.status(404).json({
        message: "User does not have values provided in req body",
        userId,
        values,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
