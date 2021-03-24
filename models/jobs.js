const Joi = require('joi');
const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
    company: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
    },
    role: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
    },
    jobLink: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
    },
    jobBoard: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
    },
    contact: {
        name: {
            type: String,
            minlength: 5,
            maxlength: 100,
        },
        email: {
            type: String,
            minlength: 5,
            maxlength: 100,
        },
        role: {
            type: String,
            minlength: 5,
            maxlength: 100,
        },
        notes: {
            type: String,
            minlength: 5,
            maxlength: 255,
        },
        linkedInProfile: {
            type: String,
            minlength: 5,
            maxlength: 100,
        },
    },
    recievedReply: {
        type: Boolean,
        default: false,
    },
    dateOfLastContact: {
        type: String,
        minlength: 5,
        maxlength: 100,
    },
});

function validateJobs(jobs) {
    const schema = Joi.object({
        company: Joi.string().min(5).max(100).required(),
        role: Joi.string().min(5).max(100).required(),
        jobLink: Joi.string().min(5).max(100).required(),
        jobBoard: Joi.string().min(5).max(100).required(),
        contact: Joi.object({
            name: Joi.string().min(5).max(100).optional(),
            email: Joi.string().min(5).max(100).optional(),
            role: Joi.string().min(5).max(100).optional(),
            notes: Joi.string().min(5).max(100).optional(),
            linkedInProfile: Joi.string().min(5).max(100).optional(),
        }).optional(),
        recievedReply: Joi.boolean().optional(),
        dateOfLastContact: Joi.string().min(5).max(100).optional(),
    });
    return schema.validate(jobs);
}

exports.jobsSchema = jobsSchema;
exports.validateJobs = validateJobs;