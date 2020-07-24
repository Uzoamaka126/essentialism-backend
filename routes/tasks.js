const express = require("express");
const router = express.Router();
const service = require("../services/task");
const { validate } = require("../helpers/protectedMiddleware");

router.post("/create", validate, async (req, res) => {
  try {
    const { body } = req;
    const response = await service.createUserTask(body);
    if (!response) {
      return res.status(response.status).json(response);
    }
    res.status(response.status).json(response);
  } catch (err) {
    console.log(err);
  }
});

// fetch tasks based on projects
router.get("/", validate, async (req, res) => {
  try {
    const { user_id, value_id, project_id } = req.body;
    const result = await service.fetchAllUserTasks(user_id, value_id, project_id);
    res.status(result.status).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

router.put("/update", validate, async (req, res) => {
  try {
    const { body } = req;
    const response = await service.updateTask(body);
    if (response) {
      return res.status(200).json(response);
    } else {
      res.status(404).json(response);
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete", validate, async (req, res, next) => {
  const { id } = req.body;
  try {
    const response = await service.removeUserTasks(id);
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
