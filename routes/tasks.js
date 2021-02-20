const express = require("express");
const router = express.Router();
const {
  createTask,
  fetchAllTasks,
  updateTask,
  removeTask,
} = require("../services/tasks");
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
    const result = await fetchAllTasks(req.body, next);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/update", validate, async (req, res, next) => {
  try {
    const response = await updateTask(req.body);
    res.status(response.status).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/delete", validate, async (req, res, next) => {
  try {
    const response = await removeTask(req.body.id);
    res.status(response.status).json(response.message);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
