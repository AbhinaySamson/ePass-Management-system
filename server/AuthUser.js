const mongoose = require('mongoose');

const AuthUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const AuthUser = mongoose.model("AuthUser", AuthUserSchema);
module.exports = AuthUser;
