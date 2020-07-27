const router = require('express').Router()
const { getAuthor } = require('../../../controllers/book/author.controller') // Conctroller

router
  .get('/:id?', getAuthor);

module.exports = router
