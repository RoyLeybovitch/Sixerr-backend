const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getorders, addorder } = require('./order.controller')
const router = express.Router()

router.get('/', getorders)
router.post('/', addorder)

module.exports = router
