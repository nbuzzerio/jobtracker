require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const { User } = require('../models/users');
const { validateJobs } = require('../models/jobs');
const _ = require('lodash');

router.post('/', auth, async (req, res) => {

  const user = await User.findById(req.user._id).select('_id name email dates');

  const { error: jobError } = validateJobs(req.body);
  if (jobError) return res.status(400).send(jobError.details[0].message);

  const jobs = user.dates.get(req.body.date);
  if (jobs) {
      jobs.push(req.body.job);
      user.dates.set(req.body.date, jobs);
      await user.save();
      return res.send('Job was successfully saved.');
  }

  user.dates.set(req.body.date, [req.body.job]);
  await user.save();

  res.send('Job was successfully saved.');
});

module.exports = router;