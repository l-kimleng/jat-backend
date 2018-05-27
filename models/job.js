
const mongoose = require('mongoose');
const {companySchema} = require('./company');
const {recruiterSchema} = require('./recruiter');

const jobSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 225
    },
    company : {
        type: companySchema,       
        refs: "Company"
    },
    recruiter: {
        type: recruiterSchema,
        refs: "Recruiter"
    },
    postDate: Date,
    appliedDate: Date,
    url: String,
    isExpired: Boolean,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports.Job = Job;