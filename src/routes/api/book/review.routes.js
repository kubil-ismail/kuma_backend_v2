const router = require('express').Router()
const { getReview, createReview, deleteReview } = require('../../../controllers/book/review.controller') // Conctroller
const { _review } = require('../../../middlewares/book/review.middleware')
const { _apiKey } = require('../../../middlewares/auth.middleware')

router
  .get('/:id?', getReview)
  .post('/', _apiKey, _review, createReview)
  .delete('/:id', _apiKey, deleteReview)

module.exports = router
