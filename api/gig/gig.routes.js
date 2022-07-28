const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getgigs, getgigById, addgig, updategig, removegig, addReview } = require('./gig.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getgigs)
router.get('/:id', getgigById)
// router.post('/', addgig)
// router.put('/:id', updategig)
// router.delete('/:id', removegig)
router.post('/', requireAuth, requireAdmin, addgig)//,
// router.put('/:id', requireAuth, requireAdmin, updategig)
router.put('/:id', requireAuth, updategig)
router.delete('/:id', removegig)//requireAuth, requireAdmin,
router.post('/:id/review', addReview)

module.exports = router
