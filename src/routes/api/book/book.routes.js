const router = require('express').Router()
const { getBook } = require('../../../controllers/book/book.controller') // Conctroller

router
  .get('/:id?', getBook);

module.exports = router
