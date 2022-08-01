const orderService = require('./order.service.js')
const logger = require('../../services/logger.service')

async function getorders(req, res) {
    try {
        const filterBy = req.query
        const orders = await orderService.query(filterBy)
        res.send(orders)
    } catch (err) {
        logger.error('Failed to get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function addorder(req, res) {
    try {
        const order = req.body
        const addedorder = await orderService.addorder(order)
        res.send(addedorder)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

async function updateorder(req, res) {
    try {
        const gig = req.body
        const updatedorder = await orderService.update(gig)
        res.json(updatedorder)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getorders,
    addorder,
    updateorder
}
