const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
//Routes
const users = require("./routes/api/user");
const posts = require("./routes/api/post");
const profiles = require("./routes/api/profile");

// DB config
const db = require("./config/keys").mongoURI;

const app = express();

//connect to Mongodb

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profiles);
app.use("/api/post", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on ${port}`));
