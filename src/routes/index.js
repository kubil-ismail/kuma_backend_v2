const router = require('express').Router()
const response = require('../helper/response')

router.get('/', (req, res) => {
  res.send(response({
    status: true,
    msg: 'Welcome to Kuma Backend'
  }))
})

module.exports = router
