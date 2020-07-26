const router = require('express').Router()
const { login, register, activate } = require('../../controllers/auth.controller') // Conctroller
const { _login, _register, _activate } = require('../../middlewares/auth.middleware') // Middleware

router
  .post('/login', _login, login)
  .post('/register', _register, register)
  .post('/activate', _activate, activate)

module.exports = router
