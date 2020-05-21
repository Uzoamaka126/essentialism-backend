const express = require("express");

const service = require("../services/values");

const { authenticate } = require("../helpers/isLoggedIn");

const router = express.Router();

router.post("/", authenticate, async (req, res, next) => {
  const values = req.body;
  try {
    const userId = req.user.subject;
    values.map((value) => {
      service.addUserValuesById({ name: value, userId });
    });
    return res.status(201).json({ message: "Added successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
    const { id } = req.params
  try {
    const response = await service.getValuesByUserId(id);
    res.status(200).json({ message: "Success", response });
    return response;
  } catch (error) {
    next(error);
  }
});

router.delete("/", authenticate, async (req, res, next) => {
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
