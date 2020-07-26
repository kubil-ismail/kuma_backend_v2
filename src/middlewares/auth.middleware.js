const { Validator } = require('node-input-validator')
const response = require('../helper/response')

const login = (req, res, next) => {
  // Validator Rule
  const valid = new Validator(req.body, {
    email: 'required|email',
    password: 'required'
  })

  let error = ''
  
  valid.check().then((matched) => {
    for (const prop in valid.errors) {
      error = valid.errors[prop].message
    }
    if (!matched) {
      res.status(422).send(response({
        msg: error
      }))
    } else {
      next()
    }
  })
}

const activate = (req, res, next) => {
  // Validator Rule
  const valid = new Validator(req.body, {
    email: 'required|email',
    code: 'required|numeric|minLength:4|maxLength:4'
  })

  let error = ''

  valid.check().then((matched) => {
    for (const prop in valid.errors) {
      error = valid.errors[prop].message
    }
    if (!matched) {
      res.status(422).send(response({
        msg: error
      }))
    } else {
      next()
    }
  })
}

module.exports = {
  _login: login,
  _register: login,
  _activate: activate
}
