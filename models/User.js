const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Beskriv hur en use ska se ut
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function(next) {
  const user = this;
  const saltRounds = 5;

  // TODO: fail-safe here if password is not changed
  if (!user.isModified("password")) next();

  bcrypt.genSalt(saltRounds, function(error, salt) {
    if (error) return next(error);

    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) return next(error);

      user.password = hash;
      next();
    });
  });
});

module.exports = User = mongoose.model("User", UserSchema);
