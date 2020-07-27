const review = require('../../models/book/review.model')
const response = require('../../helper/response')
const Filter = require('bad-words')
const filter = new Filter()

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

const createReview = async (req, res) => {
  try {
    const { book_id, user_id, rating } = req.body;
    const data = {
      user_id: user_id,
      book_id: book_id,
      review: filter.clean(req.body.review),
      rating: rating
    }
    const create = await review.createReview(data)
    if (create.insertId) {
      res.send(response({
        status: true,
        msg: 'Create review success',
        result: {
          insertId: create.insertId,
          data: data
        }
      }))
    }
  } catch (error) {
    res.status(400).send(response({
      msg: 'Something wrong, try again'
    }))
  }
}

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await review.deleteReview({ id: parseInt(id, 10) })
    if (deleted.affectedRows) {
      res.send(response({
        status: true,
        msg: 'Delete review success',
        result: {
          idReview: id
        }
      }))
    } else {
      res.status(400).send(response({
        msg: 'Something wrong, try again'
      }))  
    }
  } catch (error) {
    res.status(400).send(response({
      msg: 'Something wrong, try again'
    }))
  }
}

module.exports = {
  getReview: getReview,
  createReview: createReview,
  deleteReview: deleteReview,
}
