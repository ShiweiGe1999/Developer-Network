const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");

// Load User
const User = require("../../models/User");

//Load Profile Validator
const validateProfileInput = require("../../validation/profile");

//Load Experience Validator
const validateExperienceInput = require("../../validation/experience");

//Load Education Validator
const validateEducationInput = require("../../validation/education");

// @route GET /api/profile/test
// @desc Tests post route
// @access Public
router.get("/test", (req, res) => res.json({ message: "Profile Working!" }));

// @route Get /api/profile
// @desc Get new User Profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.profile = "No profile for the user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route Get /api/profile/all
// @desc Get All Profile
// @access Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find({})
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.profile = "No profiles";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json({ profile: "No Profiles Found!" }));
});

// @route Get /api/profile/handle/:handle
// @desc Get Profile By handle
// @access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.profile = " No profile found";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json({ profile: "No profile found" }));
});

// @route Get /api/profile/user/:user_id
// @desc Get Profile By user_id
// @access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.profile = " No profile found";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json({ profile: "No profile found!" }));
});

// @route Post /api/profile
// @desc Update or Create Profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //Skills String -> Array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    profileFields.socials = {};
    if (req.body.youtube) profileFields.socials.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.socials.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.socials.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.socials.facebook = req.body.facebook;
    if (req.body.instagram)
      profileFields.socials.instagram = req.body.instagram;
    Profile.findOne({ user: req.user.id }).then((profile) => {
      //update
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //Create

        //Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "That handle already exists";
            return res.status(400).json(errors);
          }

          //Save Profile ***
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

// @route Post /api/profile/experience
// @desc Add Experience to profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    console.log(req.body);
    if (!isValid) {
      return res.status(404).send(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add One Education to Education Array
      profile.experience.unshift(newExp);
      profile.save().then((profile) => res.json(profile));
    });
  }
);

// @route Post /api/profile/education
// @desc Add Education to profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldstudy: req.body.fieldstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add One Experience to Experience Array
      profile.education.unshift(newEdu);
      profile.save().then((profile) => res.json(profile));
    });
  }
);

// @route Delete /api/profile/experience
// @desc Delete Experience to profile
// @access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const expId = req.params.exp_id;
    Profile.findOne({ user: req.user.id }).then((profile) => {
      // Get remove index
      const deletedExp = profile.experience.filter((e, i) => e.id !== expId);
      profile.experience = deletedExp;
      profile
        .save()
        .then((profile) => res.json(profile))
        .catch((err) => res.status(404).json(err));
    });
  }
);

// @route Delete /api/profile/education
// @desc Delete Experience to profile
// @access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { edu_id } = req.params;
    Profile.findOne({ user: req.user.id }).then((profile) => {
      // Get remove index
      const deletedEdu = profile.education.filter((e, i) => e.id !== edu_id);
      profile.education = deletedEdu;
      profile
        .save()
        .then((profile) => res.json(profile))
        .catch((err) => res.status(404).json(err));
    });
  }
);
// @route Delete /api/profile
// @desc Delete User and Profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
