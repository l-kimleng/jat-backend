
const express = require('express');
const router = express.Router();
const { Job } = require('../models/job');
const _ = require('lodash');

router.get('/', async (req, res) => {
    try{
        const jobs = await Job.find()
            .sort('appliedDate')
            .select("title postDate appliedDate url company.name recruiter.name");
        res.send(jobs);
    }catch(ex) {
        res.status(500).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    try{
        const job = await createJob(req.body);
        res.send(job);
    }catch(ex) {
        res.status(500).send(ex.message);
    }    
});

async function createJob(job) {
    const j = _.pick(job, ['title', 'postDate', 'appliedDate', 'url', 'isExpired',
        'company.name', 'company.location.city', 'company.location.state', 'company.location.zipCode',
        'recruiter.name', 'recruiter.phone', 'recruiter.title', 'recruiter.company'
    ]);
    const newJob = new Job(j);
    return await newJob.save();
}

module.exports = router;