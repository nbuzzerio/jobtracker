const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/users");
const auth = require('../middleware/auth');
const bcrypt = require("bcrypt");
const _ = require("lodash");

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('_id name email dates');
    const userData = _.pick(user, ["_id", "name", "email"]);
    userData.dates = {};
    const mapKeys = user.dates.keys();
    if (mapKeys) {
      let current = mapKeys.next().value;
      while(current) {
        userData.dates[current] = user.dates.get(current);
        current = mapKeys.next().value;
      }
    }
    res.send(userData);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered to this email.");

  req.body.dates = {};
  user = new User(_.pick(req.body, ["name", "email", "password", "dates"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;