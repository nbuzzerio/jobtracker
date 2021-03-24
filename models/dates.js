const Joi = require('joi');
const mongoose = require('mongoose');
const { jobsSchema } = require('./jobs.js')

const datesSchema = new mongoose.Schema({
    date: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
        unique: true
    },
    jobs: [ jobsSchema ]
});

function validateDates(dates) {
    const schema = Joi.object({
        date: Joi.string().min(5).max(100).required(),
        jobs: Joi.array().required(),
    });
    return schema.validate(dates);
}

exports.datesSchema = datesSchema;
exports.validateDates = validateDates;