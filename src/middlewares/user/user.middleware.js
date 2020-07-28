const { Validator } = require('node-input-validator')
const response = require('../../helper/response')

const user = (req, res, next) => {
  // Validator Rule
  const valid = new Validator(req.body, {
    fullname: 'required|maxLength:25|minLength:3',
    bio: 'required|maxLength:50|minLength:3',
    birthdate: 'required|maxLength:10',
    gender: 'required|numeric'
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
  _user: user,
}
