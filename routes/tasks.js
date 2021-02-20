const express = require("express");
const router = express.Router();
const {
  createTask,
  fetchAllTasks,
  updateTask,
  removeUserTasks,
} = require("../services/task");
const { validate } = require("../helpers/protectedMiddleware");

// @TODO: Create a new task
router.post("/create", validate, async (req, res, next) => {
  try {
    const response = await createTask(req.body);
    res.status(response.status).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// fetch tasks based on projects
router.post("/fetchTasks", validate, async (req, res, next) => {
  try {
    const result = await fetchAllTasks(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
    next(error)
  }
});

router.put("/update", validate, async (req, res, next) => {
  try {
    const { body } = req;
    const response = await updateTask(body);

    res.status(response.status).json(response);

  } catch (err) {
    console.log(err);
    next(err)
  }
});

router.delete("/delete/:id", validate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await removeUserTasks(id);
    res.status(response.status).json(response.message);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
