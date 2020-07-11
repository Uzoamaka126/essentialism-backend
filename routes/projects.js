const express = require("express");
const router = express.Router();
const service = require("../services/projects");
const { authenticate } = require("../helpers/isLoggedIn");

router.post("/create", authenticate, async (req, res) => {
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

router.put("/update", authenticate, async (req, res) => {
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
router.get("/", authenticate, async (req, res) => {
  try {
    const { value_id, user_id } = req.body;
    const result = await service.fetchAllUserProjects(user_id, value_id);
    if (!result) {
      res.status(result.status).json(result.message);
    }
    res.status(result.status).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete", async (req, res, next) => {
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



// Get a single project of a specific user
// router.get("/project/:id", authenticate, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await service.fetchSingleProject(id);
//     if (!result) {
//       res.status(result.status).json(result.message);
//       return result;
//     }
//     res.status(result.status).json(result);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// });
