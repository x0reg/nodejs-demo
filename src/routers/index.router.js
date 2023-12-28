const authRouter = require("./auth.router");
const homeRouter = require("./home.router");
const authMiddleware = require("../middleware/auth.middleware");

const route = (app) => {
  app.use("/", homeRouter);
  app.use("/auth", authRouter);

  /////
  app.use((req, res) => {
    res.status(404).render("errors/404");
  });
};

module.exports = route;
