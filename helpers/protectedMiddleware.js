const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Config/index");

function validate(req, res, next) {
  const token = req.headers['authorization']
  // try {
  // console.log(req);
  //   const token = req.headers.authorization;
  //   const decoded = jwt.verify(token, process.env.SECRET);
  //   req.decoded = decoded;

  //   next();
  // } catch (error) {
  //   res.status(401).json({ message: 'Auth Failed' });
  // }
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err)
        return res.status(401).json({
          message: 'User not authenticated',
        });

      req.user = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, token is required in the Authorization Header',
    });
  }
}
module.exports = {
  validate,
};
