
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {companySchema} = require('./company');
const {recruiterSchema} = require('./recruiter');

const jobSchema = new Schema({ 
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 225
    },
    company : {
        type: companySchema,       
        ref: "Company"
    },
    recruiter: {
        type: recruiterSchema,
        ref: "Recruiter"
    },
    postDate: Date,
    appliedDate: Date,
    url: String,
    isExpired: Boolean,
    userId: {
        type: Schema.Types.ObjectId,
        trim: true
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports.Job = Job;