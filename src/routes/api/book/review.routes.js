const router = require('express').Router()
const { getReview } = require('../../../controllers/book/review.controller') // Conctroller

router
  .get('/:id?', getReview);

module.exports = router
