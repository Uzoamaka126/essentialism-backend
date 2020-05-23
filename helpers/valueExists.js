// const db = require("../db-config");

// exports.valueExists = async (req, res, next) => {
//     let { values } = req.body;
//     values.map((value) => {
//         const sortedValue = 
//     })

//     const value = await db("users_and_values").where({ name: value }).first();

//     if (value)
//         return res.status(400).json({
//             error: "This value has already been chosen",
//         });
//     next();
// };