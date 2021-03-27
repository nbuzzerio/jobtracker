require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const { User } = require('../models/users');
const { validateJobs } = require('../models/jobs');
const _ = require('lodash');

function deriveDate() {
    const today = new Date();
    const month = today.getMonth()+1;
    const dayDate = today.getDate();
    const year = today.getYear()+1900;
    const date = `${month}/${dayDate}/${year}`;
    return date;
}

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('_id name email dates');
    res.send(user.dates);
});

router.post('/', auth, async (req, res) => {

  const user = await User.findById(req.user._id).select('_id name email dates');

  req.body.date = deriveDate();

  const { error: jobError } = validateJobs(req.body);
  if (jobError) return res.status(400).send(jobError.details[0].message);

  const jobs = user.dates.get(req.body.date);
  if (jobs) {
      if (!jobs.find(job => job.company === req.body.job.company && job.role === req.body.job.role)) {
          jobs.push(req.body.job);
          user.dates.set(req.body.date, jobs);
          await user.save();
          return res.send(user);
      }
      return res.status(400).send('This job has already been entered into the log.');
  }

  user.dates.set(req.body.date, [req.body.job]);
  await user.save();

  res.send(user);
});

module.exports = router;