const router = require('express').Router()
const { getGenre } = require('../../../controllers/book/genre.controller') // Conctroller

router
  .get('/:id?', getGenre);

module.exports = router
