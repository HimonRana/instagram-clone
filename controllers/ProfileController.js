const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Load Input Validation

// Load Profile/User Model
const Profile = require("../models/Profile");
const User = require("../models/User");

// @Route   GET /profile
// @Desc    Get current users profile
// @Access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(profile => {
        // if (!profile) {
        //   errors.noprofile = "No profile found for this user";
        //   return res.status(404).json(errors);
        // }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @Route   GET profile/all
// @Desc    Get all users
// @Access  Private
router.get(
  "/all",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.find()
      .populate("user", ["name "])
      .then(users => {
        if (!users) {
          errors.nouser = "There are no profiles";
          return res.status(404).json(errors);
        }

        res.json(users);
      })
      .catch(err => res.status(404).json({ users: "There are no profiles" }));
  }
);

// @Route   GET profile/:user_id
// @Desc    Get profile by User ID
// @Access  Public
router.get("/:id", (req, res) => {
  const erros = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "text", "postImg"])
    .then(profile => {
      // if (!profile || profile.length === 0) {
      //   errors.noprofile = "This user has no profile";
      //   res.status(404).json(errors);
      // }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "No profile for this user" })
    );
});

// @Route   POST /profile
// @Desc    Create/Edit user profile
// @Access  Private
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    } else {
      profileFields.bio = "";
    }

    if (req.body.imgUrl) {
      profileFields.imgUrl = req.body.imgUrl;
    } else {
      profileFields.imgUrl = "";
    }

    // Find User and then Create bio
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findByIdAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        return res.status(200).send({ profile: profile });
      }
    });
    new Profile(profileFields).save().then(Profile => res.json(Profile));
  }
);
// .catch(err => res.status(404).json({ bio: "no bio here" }));
//   }
// );

// @Route   DELETE profile
// @Desc    Delete User and Profile
// @Access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true, msg: "User/Profile successfully deleted" })
      );
    });
  }
);
module.exports = router;
