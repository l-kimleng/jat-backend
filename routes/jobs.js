
const express = require('express');
const router = express.Router();
const { Job } = require('../models/job');
const _ = require('lodash');
const auth = require('../middleware/auth');

router.get('/:title/:companyName/', auth, async (req, res) => {
    try{
        const query = {
            page: req.query.page,
            size: req.query.size,
            title: req.params.title,
            companyName: req.params.companyName,
            userId: req.user._id
        };
        const jobs = await find(query);
        res.send(jobs);
    }catch(ex) {
        res.status(500).send(ex.message);
    }
});

router.get('/', auth, async (req, res) => {
    try{
        const query = {
            page: req.query.page,
            size: req.query.size,
            userId: req.user._id
        };
        const jobs = await find(query);
        res.send(jobs);
    }catch(ex) {
        res.status(500).send(ex.message);
    }
});

async function find(query) {
    let page = parseInt(query.page);
    let size = parseInt(query.size);
    if(page <= 0) page = 1;
    if(size <= 0) size = 5;

    let q = {
        userId: query.userId
    };
    
    if(query.title || query.companyName) {
        q = _.merge(q, {
        $or: [
                {title: { $regex: query.title, $options: "i"}},
                {"company.name": { $regex: query.companyName, $options: "i" }}
            ]
        }); 
    }
    const result = await Job.find(q)
        .sort('appliedDate')
        .skip((page - 1)*size)
        .limit(size)
        .select("title postDate appliedDate url company.name company.location recruiter.name");
    
    return result;
}

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