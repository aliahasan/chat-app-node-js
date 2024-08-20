// external imports
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const path = require("path");
const login = require("./router/login");
const users = require("./router/users");
const inbox = require("./router/inbox");
// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log(" mongodb connection successful");
  })
  .catch((error) => {
    console.log(error);
  });

//  request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", login);
app.use("/users", users);
app.use("/inbox", inbox);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`chat application running on ${PORT}`);
});
