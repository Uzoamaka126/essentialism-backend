const express = require("express");
const router = express.Router();
const service = require("../services/projects");
const { authenticate } = require("../helpers/isLoggedIn");

router.post("/create", authenticate, async (req, res) => {
  try {
    const { body } = req;
    // const { value_id, user_id } = body;
    const response = await service.createUserProject(body);
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
router.get("/valuesandprojects/:userId/:valueId", authenticate, async (req, res) => {
  try {
    const { valueId, userId } = req.params;
    const result = await service.fetchAllUserProjects(userId, valueId);
    if (!result.data) {
      res.status(404).json("no data");
    }
    res.status(200).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

// Get a single project of a specific user
router.get("/project/:id", authenticate, async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await service.fetchSingleProject(projectId);
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
/* ------- Tasks ------------------ */
// router.get("/:projectId", authenticate, async (req, res) => {
//   try {
//     const { projectId } = req.params;
//     const { userId, valueId } = req.body;
//     const result = await service.fetchAllUserTasks(userId, valueId, projectId);
//     res.status(200).json(result);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// });

// // Get a single project of a specific user
// router.get("/:userId/:projectId", authenticate, async (req, res) => {
//   try {
//     const { userId, projectId } = req.params;
//     const result = await service.fetchSingleProject(userId, projectId);
//     res.status(200).json(result);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// });


module.exports = router;
