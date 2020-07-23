const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Config/index");

function validate(req, res, next) {
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err)
        return res.status(401).json({
          message: "User not authenticated",
        });
      req.user = user;
      next();
    });
  }
}

module.exports = {
  validate,
};
