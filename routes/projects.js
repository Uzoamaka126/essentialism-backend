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
router.get("/me/:userId/:valueId", authenticate, async (req, res) => {
  try {
    const { valueId, userId } = req.params;
    const result = await service.fetchAllUserProjects(userId, valueId);
    if (!result) {
      res.status(result.status).json(result.message);
    }
    res.status(result.status).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

// Get a single project of a specific user
router.get("/project/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.fetchSingleProject(id);
    if (!result) {
      res.status(result.status).json(result.message);
      return result;
    }
    res.status(result.status).json(result);
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
