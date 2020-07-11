const express = require("express");
const router = express.Router();
const service = require("../services/projects");
const { authenticate } = require("../helpers/isLoggedIn");

// fetch tasks based on projects
router.get("/:projectId/alltasks", authenticate, async (req, res) => {
    try {
        const { projectId } = req.params;
        const { userId, valueId } = req.body;
        const result = await service.fetchAllUserTasks(projectId);
        res.status(200).json(result);
        return result;
    } catch (error) {
        console.log(error);
    }
});

// Get a single project of a specific user
router.get("/:id", authenticate, async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const result = await service.fetchSingleProject(projectId);
    res.status(200).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
