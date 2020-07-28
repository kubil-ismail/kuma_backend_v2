const router = require('express').Router()
const { getUser, updateUser } = require('../../../controllers/user/user.controller') // Conctroller
const { _user } = require('../../../middlewares/user/user.middleware') // Middleware

router
  .get('/:id', getUser)
  .patch('/:id', _user, updateUser);

module.exports = router
