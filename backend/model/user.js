const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  phone: { type: Number, required: true},
  code: { type: Number, required: true},
  twofactorpin: { type: String },
  pincreationtime: { type: Date },
  loginattempt: { type: Number },
  lastlogin: { type: Date },
  verifyattempt: { type: Number },
  lastverify: { type: Date }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema, 'users');
