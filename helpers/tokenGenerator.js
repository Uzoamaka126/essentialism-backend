const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  generateVerificationToken,
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ["username"],
  };
  const options = {
    expiresIn: "1d",
  };
  const result = jwt.sign(
    payload,
    process.env.SECRET || "A SECRET CODE HERE",
    options
  );

  return result;
}

function generateVerificationToken(len, arr) {
  var result = "";
  for (var i = len; i > 0; i--) {
    result += arr[Math.floor(Math.random() * arr.length)];
  }
  return result;
}
