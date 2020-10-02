const express = require("express");
const router = express.Router();
const service = require("../services/values");
const { validate } = require('../helpers/protectedMiddleware')

router.get("/", validate, async (req, res, next) => {
  try {
    const values = await service.getValues();
    res.status(values.statusCode).json(values.data);
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

// @TODO: Add top three user values
router.post("/create", validate, async (req, res, next) => {
  const values = req.body.values;
  try {
    const userId = req.user.subject;
    values.map(value => {
      service.createUserTopThreeValues({ value_id: value, user_id: userId })
    })
    res.status(200).json({ message: "Added", result: values});
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @TODO: Fetch top three user values
router.get("/fetch/:id", validate, async (req, res, next) => {
  try {
    const { id } = req.params;
    // const id2 = req.user.subject;

    const result = await service.fetchTopThreeValues(id);
     res.status(result.statusCode).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
