const review = require('../../models/book/review.model')
const response = require('../../helper/response')

const getReview = async (req, res) => {
  try {
    const { id } = req.params
    const getReview = await review.getReview({ id: id, query: req.query })
    if (getReview.length >= 1) {
      res.send(response({
        status: true,
        msg: 'Get review success',
        result: getReview
      }))
    } else {
      res.status(400).send(response({
        msg: 'Review list not found',
      }))
    }
  } catch (error) {
    res.status(400).send(response({
      msg: 'Something wrong, try again'
    }))
  }
}

module.exports = {
  getReview: getReview
}
