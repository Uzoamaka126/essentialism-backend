const authRouter = require("./auth");
const usersRouter = require("./users");
const valuesRouter = require("./values");

function routes(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/values", valuesRouter);

  app.get("/", (req, res) => {
    res.status(200).json({
      api: "running",
    });
  });
}

module.exports = routes;
