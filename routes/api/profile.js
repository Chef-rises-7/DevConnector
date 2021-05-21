const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
const config = require("config");
const axios = require("axios");

//Get to /api/profile/me
// get the current users profile
// PRIVATE

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile of this user" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);

    res.status(500).send("Server Error");
  }
});

//post to /api/profile
// create or update the users profile
// PRIVATE

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is not found").not().isEmpty(),
      check("skills", "Skills not found").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    let profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update a profile
        console.log("heloo");
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //create a profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Get to /api/profile
// get all users profile
// PUBLIC

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    res.json(profiles);
  } catch (err) {
    console.log(err.message);

    res.status(500).send("Server Error");
  }
});

//Get to /api/profile/user/:user
// get a user profile with id
// PUBLIC

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.status(500).send("Server Error");
  }
});

//delete /api/profile
// delete profile and user
// PRIVATE

router.delete("/", auth, async (req, res) => {
  try {
    //Delete a profile and user
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//put /api/profile/experience
// add the exp to the profile
// PRIVATE

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title not found").not().isEmpty(),
      check("company", "Company not found").not().isEmpty(),
      check("from", "From date not found").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      company,
      title,
      from,
      current,
      location,
      to,
      description,
    } = req.body;

    let newExperience = {
      company,
      title,
      from,
      current,
      location,
      to,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExperience);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//delete /api/profile/experience/:exp_id
// delete experience of the user
// PRIVATE

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const index_num = await profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(index_num, 1);
    await profile.save();

    res.json({ msg: "User's experience deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//put /api/profile/education
// add the exp to the profile
// PRIVATE

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School not found").not().isEmpty(),
      check("degree", "Degree not found").not().isEmpty(),
      check("fieldofstudy", "Field of Study not found").not().isEmpty(),
      check("from", "From date not found").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      school,
      degree,
      from,
      fieldofstudy,
      current,
      to,
      description,
    } = req.body;

    let newEducation = {
      school,
      degree,
      from,
      fieldofstudy,
      current,
      to,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEducation);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//delete /api/profile/education/:edu_id
// delete education of the user
// PRIVATE

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    //Delete a profile and user
    const profile = await Profile.findOne({ user: req.user.id });
    const index_num = await profile.experience
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(index_num, 1);
    await profile.save();

    res.json({ msg: "User's education deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//Get to /api/profile/github/:git_name
// get repos of git_name
// PUBLIC

router.get("/github/:git_name", async (req, res) => {
  try {
    const options = {
      url: `https://api.github.com/users/${
        req.params.git_name
      }/repos?per_page=5&sort=created:asc$client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "get",
      headers: { "user-agent": "node.js" },
    };

    await axios(options)
      .then((response) => {
        if (response.status !== 200) {
          return res.json({ msg: "Github repos not found" });
        }

        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
