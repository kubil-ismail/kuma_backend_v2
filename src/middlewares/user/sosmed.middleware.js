const { Validator } = require('node-input-validator')
const response = require('../../helper/response')

const sosmed = (req, res, next) => {
  // Validator Rule
  const valid = new Validator(req.body, {
    facebook: 'required|maxLength:50|minLength:3',
    instagram: 'required|maxLength:50|minLength:3',
    twitter: 'required|maxLength:50|minLength:3',
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
  _sosmed: sosmed,
}
