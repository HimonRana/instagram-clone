const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const User = require("../models/User");
const TokenVerify = require("../middleware/TokenVerify");

// @Route   POST auth/login
// @Desc    Login user / Returning JWT Token
// @Access  Public
router.post("/login", function(req, res) {
  const { errors, isValid } = validateLoginInput(req.body);

  // To check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }, function(error, user) {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    if (error) {
      return res
        .status(500)
        .send("An error occured while trying to login with the user.");
    }

    // Compare/check Password
    var isValidPassword = bcrypt.compareSync(req.body.password, user.password);

    var token = jwt.sign({ id: user._id, name: user.name }, keys.secretOrKey, {
      expiresIn: 3600
    });

    if (!isValidPassword) {
      errors.password = "Password incorrect";
      return res.status(401).json(errors);
    }

    // Remove the password before returning
    delete user.password;

    // if everything goes according plan
    return res.status(200).json({
      authenticated: true,
      user: user,
      token: "Bearer " + token,
      msg: "success"
    });
  });
});

// @route   POST auth/register
// @desc    Register user
// @access  Public
router.post("/register", function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  // To check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json(errors);
    } else {
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        },
        function(error, user) {
          // This is a callback
          if (error) {
            return res
              .status(500)
              .send(
                "An error occurred while trying to add information to the database " +
                  error
              );
          } else {
            // Create a JWT token
            return res.status(200).send({ user: user });
          }
        }
      );
    }
  });
});

// @Route   POST auth/me
// @Desc    Return current user
// @Access  Private
router.get("/me", TokenVerify, function(req, res) {
  // Hitta user med hjälp av Token.id

  User.findById(req.userId, { password: 0 }, function(error, user) {
    if (error) {
      res.status(500).send("An error occured while trying to find the user.");
    }
    if (!user) {
      res.status(404).send("User not found");
    }

    res.status(200).send({
      authenticated: true,
      user: user
    });
  });
});

// @Route   POST auth/current
// @Desc    Return current user
// @Access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
