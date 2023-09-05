const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5050;
const app = express();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

const session = require("express-session");
const passport = require("passport");
const passportFacebook = require("passport-facebook");
const FacebookStrategy = passportFacebook.Strategy;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      //callback url is where you want to go after you login
      callbackURL: "http://localhost:8000/facebook/callback",
      //Data that you want to get back from facebook,
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      //this is where you can save the user to the database
      console.log(profile);
      return done(null, profile);
    }
  )
);

//this is for the session
//user is the data that you want to save
//done is a callback function
passport.serializeUser((user, done) => {
  done(null, user);
});

//this is for when you want to get the user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(cors());

connectDB();

//this allows us to use the body of the request
//you will get undefined if you don't have this
app.use(express.json());
//this allows us to use url encoded data
//this is for when you submit a form
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//setting up session
//secret is a random string
//resave is false because we don't want to save the session if nothing is modified
//saveUninitialized is false because we don't want to save the session if nothing is stored
app.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Add Passport Facebook routes
app.get("/facebook", passport.authenticate("facebook"));
app.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    // Redirect to the main page upon successful login.
    successRedirect: "http://localhost:3000/home",
    // Redirect to login page on authentication failure.
    failureRedirect: "http://localhost:3000",
  })
);

app.use("/api/records", require("./routes/recordRoutes"));

app.use(errorHandler);
