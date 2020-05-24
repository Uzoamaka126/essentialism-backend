const express = require("express");
const router = express.Router();
const service = require("../services/projects");

const { authenticate } = require("../helpers/isLoggedIn");

router.post("/create", authenticate, async (req, res) => {
  try {
    const { body } = req;
    const { value_id, user_id } = body;
    const response = await service.createUserProject({
      project_name: body.project_name,
      user_id: user_id,
      value_id: value_id,
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json(response);
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/update", authenticate, async (req, res) => {
  try {
    const { user_id, value_id, project_id, project_name } = req.body;
    const response = await service.updateProjectName(
      project_name,
      user_id,
      value_id,
      project_id
    );
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(304).json(response);
    }
  } catch (err) {
    console.log(err);
  }
});

// Get all the projects of a specific user
router.get("/:userId", authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await service.fetchAllUserProjects(userId);
    res.status(200).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

// Get a single project of a specific user
router.get("/:userId/:projectId", authenticate, async (req, res) => {
  try {
    const { userId, projectId } = req.params;
    const result = await service.fetchSingleProject(userId, projectId);
    res.status(200).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

// router.delete("/:id/values", async (req, res, next) => {
//   const values = req.body;
//   try {
//     const userId = req.user.subject;
//     const remove = await service.removeUserValues(userId, values);
//     const response = await service.getValuesByUserId(userId);
//     if (remove === values.length) {
//       return res.status(200).json({
//         message: "Successfully deleted",
//         userId,
//         deleted: values,
//         new: response,
//       });
//     } else {
//       return res.status(404).json({
//         message: "User does not have values provided in req body",
//         userId,
//         values,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

module.exports = router;
