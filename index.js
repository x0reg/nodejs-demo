const express = require("express");
const app = express();
const path = require("path");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

const db = require("./src/config/db");
const route = require("./src/routers/index.router");
const authMiddleware = require("./src/middleware/auth.middleware");
////config

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    // defaultLayout: true,
    helpers: {
      foo: () => {
        return "ĐÂY LÀ HELPER";
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/src/views"));

///router
app.use(authMiddleware.authenticateToken);
route(app);
///db
db.connection();
////run serv
app.listen(port, () => {
  console.log(`Sever running port ${port}`);
});
