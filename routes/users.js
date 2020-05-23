const express = require("express");
const {
  fetchUsers,
  fetchSingleUser,
  fetchUserValues,
  addSingleUserValues,
  editUserInfo
} = require("../services/users");
const { authenticate } = require("../helpers/isLoggedIn");
const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const result = await fetchUsers();
    res.status(200).json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id/edit", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const response = await editUserInfo(body, id);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

router.get("/values", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await fetchUserValues(id);
    return res.status(200).json({ message: "Success", response });
  } catch (error) {
    console.log(error)
    next(error);
  }
});

router.post("/values/:id", authenticate, async (req, res, next) => {
  const { values } = req.body;
  try {
    const userId = req.user.subject;
    values.map((value) => {
      addSingleUserValues({ name: value, userId }) ;
    });
    return res.status(201).json({ message: "Successful", values });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await fetchSingleUser(id);
    return res.status(200).json(result);
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