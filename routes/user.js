const mongoose = require('mongoose');
const express = require('express');
const router = express.Router()
const { User, validateUser } = require('../models/users');
const { validateJobs } = require('../models/jobs');
const { validateDates } = require('../models/dates');
const _ = require('lodash');



module.exports = router;