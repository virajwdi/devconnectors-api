const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const manageProfile = require("../models/profile");
const user = require("../models/users");

// --- Load validation ---
const validateExperianceForm = require("../validations/experiance");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const error = {};
    manageProfile
      .findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          error.noprofile = "No profile found";
          return res.status(200).json({ status: "401", data: {} });
        }
        res.status(200).json(profile);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);
// ------------ L O A D   R O U T E R -----------
router.post(
  "/updateExperiance",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateExperienceInput(req.body);
    //Get Fields
    const profileFields = {};
    profileFields.user = req.user._id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    manageProfile
      .findOne({ user: req.user._id })
      .then((response) => {
        if (response) {
          manageProfile
            .findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            )
            .then((profile) => {
              res.json(profile);
            })
            .catch((err) =>
              res
                .status(500)
                .json({ returnCode: err, message: "Failed to update data" })
            );
        } else {
          manageProfile
            .findOne({ handle: req.body.handle })
            .then((profile) => {
              if (profile) {
                res.status(500).json({ msg: "This handle is already taken" });
              }
            })
            .catch((err) => console.log({ err: "something went wrong33" }));

          // save profile
          console.log(profileFields);
          new manageProfile(profileFields)
            .save()
            .then((profile) => {
              return res.status(201).json(profile);
            })
            .catch((err) => console.log({ err: err }));
        }
      })
      .catch((err) => console.log("sdfsd", { err: err }));
  }
);

router.post(
  "/experiance",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperianceForm(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    manageProfile.findOne({ user: req.body._id }).then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then((profile) => res.json(profile));
      return res.status(200).json(profile);
    });
  }
);




router.post("/followUser", passport.authenticate('jwt', {session:false}), (req,res)=>{
    const userRelation = {}
    
})

module.exports = router;
