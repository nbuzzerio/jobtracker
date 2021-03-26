require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/users');
const _ = require('lodash');
const Joi = require('joi');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Invalid email or password.");

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  
  const userData = _.pick(user, ["_id", "name", "email"]);

  userData.dates = {};
  const mapKeys = user.dates.keys();
  if (mapKeys) {
    let current = mapKeys.next().value;
    while(current) {
      current = mapKeys.next().value;
      userData.dates[current] = user.dates.get(current);
    }
  }
  res.header("x-auth-token", token).send(userData);
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });
    return schema.validate(req);
};

module.exports = router;