const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('./model/user');
const OTP = require('./otp');

const app = express();

//Connection set to MongoDB
mongoose.connect("mongodb://localhost:27017/467FinalProject", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

// Using bodyParser Module so that we can read and response in JSON data format.
app.use(bodyParser.json());

// Setting Header Permissions since our servers are on different ports, this allows you to make specific API requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS, PUT"
      );
  next();
});

app.post("/login", (req, res, next) => {
  let fetchedUser;

  console.log(req.body.email);
  // Using findOne to find the customer from the Database
  User.findOne({ email: req.body.email })
    .then(user => {
      // If the email is not found
      if (!user) {
        console.log('User not found');

        throw new Error('User not found');
      }
      console.log('User found');
      // If the email is found
      fetchedUser = user;
      // Checks password and returns true of false depending if the password is correct or not
      return bcrypt.compare( req.body.pass, user.password )
    })
    .then(result => {
      console.log("Password Checked");
      // Using result from bcrypt to check result
      // If bcrypt returned false aka account credentials were invalid
      if (!result) {
        console.log('Password was incorrect');
        throw new Error('Password was incorrect');
      }
      console.log('Login successful.');
      //returns the token and user information as a response to frontend
      res.status(200).json({
        message: "User has Logged In"
      });
    })
    // Catch any errors
    .catch(err => {
      console.log(err);

      return res.status(401).json({
        message: "Account Authentication Failed"
      });
    });
});

app.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.pass, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      phone: req.body.ph,
      code: req.body.code,
      password: hash
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'User Account Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });
});

module.exports = app;
