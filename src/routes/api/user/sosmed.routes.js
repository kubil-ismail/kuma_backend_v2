const router = require('express').Router()
const { getSosmed, updateSosmed } = require('../../../controllers/user/sosmed.controller') // Conctroller
const { _sosmed } = require('../../../middlewares/user/sosmed.middleware') // Middleware
const { _apiKey } = require('../../../middlewares/auth.middleware')

router
  .get('/:id', getSosmed)
  .patch('/:id', _apiKey, _sosmed, updateSosmed);

module.exports = router
