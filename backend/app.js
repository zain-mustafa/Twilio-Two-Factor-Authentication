const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('./model/user');
const OTP = require('./otp');

const app = express();

user = {
  email: '',
  phone: '',
  countrycode: ''
}

const accountSid = 'AC5001bfa9f9d25326361fecafb0b5b166';
const authToken = '51c3b2f34026eb4bdd4e8468730b12c2';

const client = require('twilio')(accountSid, authToken);

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
  User.findOne({ email: req.body.email })
    .then(user => {
      // If the email is not found
      if (!user) {
        console.log('User not found');

        throw new Error('User not found');
      }
      console.log('User found');
      fetchedUser = user;
      return bcrypt.compare( req.body.pass, user.password )
    })
    .then(result => {
      console.log("Password Checked");
      if (!result) {
        console.log('Password was incorrect');
        throw new Error('Password was incorrect');
      }
      console.log('Login successful.');
      res.status(200).json({
        message: "User has Logged In",
        email: fetchedUser.email,
        phone: fetchedUser.phone,
        countrycode: fetchedUser.code
      });
    })
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
      twofactorpin: '',
      pincreationtime: 0,
      loginattempt: 0,
      lastlogin: 0,
      verifyattempt: 0,
      lastverify: 0,
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

app.post('/sendcode', (req,res,next) => {
  const oneTimePass = OTP.oneTimePass();
  const toNumber = '+' + req.body.code + req.body.phone;
  const creationDate = new Date();
  let attemptNumber;
  let wasSent = false;
  console.log(req.body);
  console.log(oneTimePass);

  User.findOne({ email: req.body.email})
  .then(user => {
    console.log(user.verifyattempt);
    console.log((creationDate - user.lastverify)/(1000 * 60));
    attemptNumber = user.verifyattempt
    console.log(attemptNumber);

    if ( attemptNumber < 4) {

      client.messages.create({
        to: toNumber,
        from: '+12267734977',
        body: oneTimePass
      }).then(
        res.status(200).json({
          message: 'Code Sent'
        })
      );

      attemptNumber = attemptNumber + 1;
      wasSent = true;
      console.log("Inside Attempts");
      console.log(attemptNumber);
      console.log(wasSent);
    } else if ( (creationDate - user.lastverify)/(1000 * 60) > 15) {

      client.messages.create({
        to: toNumber,
        from: '+12267734977',
        body: oneTimePass
      }).then(
        res.status(200).json({
          message: 'Code Sent'
        })
      );

      attemptNumber = 0;
      wasSent = true;
      console.log("Inside Date");
      console.log(attemptNumber);
      console.log(wasSent);
    } else {
      res.status(200).json({
        message: 'Code Not Sent'
      });
    }

    if ( wasSent === true ) {
      console.log(attemptNumber);
      User.update(
        { email: req.body.email },
        { $set:
          {
            twofactorpin: oneTimePass,
            pincreationtime: creationDate,
            lastverify: creationDate,
            verifyattempt: attemptNumber
          }
        }
      ).then(result => {
        console.log(result);
      });
    }

  });
});

app.post('/verify', (req,res,next) => {
  const currentDate = new Date();
  User.findOne({ email: req.body.email })
  .then(user => {
    console.log((currentDate - user.pincreationtime)/(1000*60));
    if ( ( currentDate - user.pincreationtime )/(1000*60) > 5 ) {
      res.status(200).json({
        message: "Time Has Passed"
      });
    } else {
      if ( user.twofactorpin === req.body.code) {
        res.status(200).json({
          message: "Authenticated"
        });
      } else {
        res.status(200).json({
          message: "Not Authenticated"
        });
      }
    }
  })
});

module.exports = app;
