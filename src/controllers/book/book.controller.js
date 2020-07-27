const book = require('../../models/book/book.model')
const response = require('../../helper/response')

const getBook = async (req, res) => {
  try {
    const { id } = req.params
    const getBook = await book.getBook({ id })
    if (getBook.length >= 1) {
      res.send(response({
        status: true,
        msg: 'Get book success',
        result: getBook
      }))
    } else {
      res.status(400).send(response({
        msg: 'Book not found',
      }))
    }
  } catch (error) {
    res.status(400).send(response({
      msg: 'Something wrong, try again'
    }))
  }
}

module.exports = {
  getBook: getBook
}