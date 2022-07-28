const gigService = require('./gig.service.js')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service.js')

async function getgigs(req, res) {
    console.log('brefore try')
    try {
        console.log('after try')
        const queryParams = req.query
        const gigs = await gigService.query(queryParams)
        res.json(gigs)
    } catch (err) {
        res.status(404).send(err)
    }
}

async function getgigById(req, res) {
    try {
        const gigId = req.params.id
        const gig = await gigService.getById(gigId)
        res.json(gig)
    } catch (err) {
        res.status(404).send(err)
    }
}

async function addgig(req, res) {
    const gig = req.body
    console.log(gig)
    try {
        const addedgig = await gigService.add(gig)
        broadcast({ type: 'something-changed', userId: req.session?.user._id })
        res.json(addedgig)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function updategig(req, res) {
    try {
        const gig = req.body
        const updatedgig = await gigService.update(gig)
        res.json(updatedgig)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function removegig(req, res) {
    try {
        const gigId = req.params.id
        const removedId = await gigService.remove(gigId)
        res.send(removedId)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function addReview(req, res) {
    const gigId = req.params.id
    const review = req.body
    try {
        const addedReview = await gigService.addReview(review, gigId)
        res.send(addedReview)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getgigs,
    getgigById,
    addgig,
    updategig,
    removegig,
    addReview,
}
