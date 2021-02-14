const express = require("express");
const router = express.Router();
const service = require("../services/values");
const { validate } = require("../helpers/protectedMiddleware");

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
  const { valueId, userId, topValuesId } = req.body;
  try {
    const result = await service.createUserTopThreeValues({
      userId,
      valueId,
      topValuesId,
    });
    res.status(result.status).json({ data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @TODO: Fetch top three user values
router.post("/fetchValues", validate, async (req, res, next) => {
  try {
    const { userId } = req.body;
    const result = await service.fetchTopThreeValues(userId);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/delete/:id", validate, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.subject;

  if (!id || !userId) {
    return res.status(404).json({ message: "Id not provided" });
  }

  try {
    const response = await service.removeUserTopThreeValues(userId, id);
    return res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
