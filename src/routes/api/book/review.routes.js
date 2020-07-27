const router = require('express').Router()
const { getReview, createReview, deleteReview } = require('../../../controllers/book/review.controller') // Conctroller
const { _review } = require('../../../middlewares/book/review.middleware')

router
  .get('/:id?', getReview)
  .post('/', _review, createReview)
  .delete('/:id', deleteReview)

module.exports = router
