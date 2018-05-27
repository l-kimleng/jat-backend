
const express = require('express');
const router = express.Router();
const { Job } = require('../models/job');
const _ = require('lodash');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try{
        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);
        if(page <= 0) page = 1;
        if(size <= 0) size = 5;

        const jobs = await Job.find({userId: req.user._id})
            .sort('appliedDate')
            .skip((page - 1)*size)
            .limit(size)
            .select("title postDate appliedDate url company.name recruiter.name");
        res.send(jobs);
    }catch(ex) {
        res.status(500).send(ex.message);
    }
});

router.post('/', auth, async (req, res) => {
    try{
        const job = await createJob(_.merge(req.body, {userId: req.user._id}));
        res.send(job);
    }catch(ex) {
        res.status(500).send(ex.message);
    }    
});

async function createJob(job) {
    const j = _.pick(job, ['title', 'postDate', 'appliedDate', 'url', 'isExpired', 'userId',
        'company.name', 'company.location.city', 'company.location.state', 'company.location.zipCode',
        'recruiter.name', 'recruiter.phone', 'recruiter.title', 'recruiter.company'
    ]);
    const newJob = new Job(j);
    return await newJob.save();
}

router.delete('/:id', auth, async (req, res) => {
    try{
        const job = await Job.findOneAndRemove({_id: req.params.id, userId: req.user._id});
        if(!job) return res.status(404).send('Job not found for the given id.');
        res.send(job);
    }catch(ex) {
        res.send(500).send(ex.message);
    }
});

module.exports = router;