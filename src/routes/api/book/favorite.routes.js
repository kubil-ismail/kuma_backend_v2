const router = require('express').Router()
const { getFavorite } = require('../../../controllers/book/favorite.controller') // Conctroller

router
  .get('/:id', getFavorite);

module.exports = router
