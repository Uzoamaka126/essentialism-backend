const express = require("express");
const service = require("../services/values");
const { validate } = require('../helpers/protectedMiddleware')
const router = express.Router();

router.get("/", validate, async (req, res, next) => {
  try {
    const values = await service.getValues();
    res.status(200).json(values.data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const value = await service.getSingleValue(id);
    res.status(value.statusCode).json(value.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
