const express = require("express");
const router = express.Router();
const service = require("../services/task");
const { validate } = require("../helpers/protectedMiddleware");

// @TODO: Create a new task
router.post("/create", validate, async (req, res, next) => {
  try {
    const { body } = req;
    const response = await service.createUserTask(body);
    res.status(response.status).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// fetch tasks based on projects
router.get("/:id", validate, async (req, res, next) => {
  try {
    const user_id = req.user.subject;
    const project_id = req.params.id

    const result = await service.fetchAllUserTasks(user_id, project_id);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(error);
    next(error)
  }
});

router.put("/update", validate, async (req, res, next) => {
  try {
    const { body } = req;
    const response = await service.updateTask(body);

    res.status(response.status).json(response);

  } catch (err) {
    console.log(err);
    next(err)
  }
});

router.delete("/delete/:id", validate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await service.removeUserTasks(id);
    res.status(response.status).json(response.message);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
