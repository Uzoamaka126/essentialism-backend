const express = require("express");
const router = express.Router();
const service = require("../services/projects");
const { validate } = require("../helpers/protectedMiddleware");

router.post("/create", validate, async (req, res) => {
  try {
    const { body } = req;
    const response = await service.createUserProject(body);
    if (!response) {
      return res.status(response.status).json(response);
    }
      res.status(response.status).json(response);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update", validate, async (req, res) => {
  try {
      const { body } = req;
    const response = await service.updateProjectName(body);
    if (response) {
      return res.status(200).json(response);
    } else {
      res.status(404).json(response);
    }
  } catch (err) {
    console.log(err);
  }
});

/* --------- Projects ---------- */
// Get all the projects of a specific user based on a value
router.get("/", validate, async (req, res) => {
  try {
    const { user_id } = req.body;

    const result = await service.fetchAllUserProjects(user_id);
    if (!result) {
      res.status(result.status).json(result.message);
    }
    res.status(result.status).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

router.get("/get", validate, async (req, res) => {
  try {
    const { value_id } = req.query;
    const { user_id } = req.body;

    if (!value_id && !user_id) {
      res.status(404).json({ "message": "No value id or user id was specified in the query string" });
    }

    const result = await service.fetchAllUserProjectsByValue(user_id, value_id);
    if (!result) {
      res.status(result.status).json(result.message);
    }
    res.status(result.status).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete", validate, async (req, res, next) => {
  const { id } = req.body;
  try {
    const response = await service.removeUserProjects(id);
    res.status(response.status).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;