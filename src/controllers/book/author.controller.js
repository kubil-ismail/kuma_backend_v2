const author = require('../../models/book/author.model')
const response = require('../../helper/response')

const getAuthor =  async (req, res) => {
  try {
    const { id } = req.params
    const getAuthor = await author.getAuthor({ id })
    if (getAuthor.length >= 1) {
      res.send(response({
        status: true,
        msg: 'Get author success',
        result: getAuthor
      }))
    } else {
      res.status(400).send(response({
        msg: 'Author not found',
      }))
    }
  } catch (error) {
    res.status(400).send(response({
      msg: 'Something wrong, try again'
    }))
  }
}

module.exports = {
  getAuthor: getAuthor
}
