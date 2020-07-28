const router = require('express').Router()
const { getUser, updateUser } = require('../../../controllers/user/user.controller') // Conctroller
const { _user } = require('../../../middlewares/user/user.middleware') // Middleware
const { _apiKey } = require('../../../middlewares/auth.middleware')

router
  .get('/:id', getUser)
  .patch('/:id', _apiKey, _user, updateUser);

module.exports = router
