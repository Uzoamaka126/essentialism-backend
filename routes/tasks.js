const express = require("express");
const router = express.Router();
const service = require("../services/task");
const { authenticate } = require("../helpers/isLoggedIn");

router.post("/create", authenticate, async (req, res) => {
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
router.get("/", authenticate, async (req, res) => {
  try {
    const { user_id, value_id, project_id } = req.body;
    const result = await service.fetchAllUserTasks(user_id, value_id, project_id);
    res.status(result.status).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

router.put("/update", authenticate, async (req, res) => {
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

router.delete("/delete", async (req, res, next) => {
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
