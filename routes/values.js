const express = require("express");
const service = require("../services/values");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const values = await service.getValues();
    res.status(values.statusCode).json(values.data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const value = await service.getSingleValue(id);
    res.status(value.statusCode).json(value.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
