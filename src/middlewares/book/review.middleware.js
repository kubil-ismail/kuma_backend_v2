const { Validator } = require('node-input-validator')
const response = require('../../helper/response')

const review = (req, res, next) => {
  // Validator Rule
  const valid = new Validator(req.body, {
    book_id: 'required|numeric',
    user_id: 'required|numeric',
    review: 'required|maxLength:100|minLength:3',
    rating: 'required|numeric',
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
  _review: review,
}
