const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Config/index");

function validate(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET);
    req.decoded = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth Failed' });
  }
}

module.exports = {
  validate,
};
