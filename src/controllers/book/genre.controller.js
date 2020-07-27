const favorite = require('../../models/book/genre.model')
const response = require('../../helper/response')

const getGenre = async (req, res) => {
  try {
    const { id } = req.params
    const getGenre = await favorite.getGenre({ id })
    if (getGenre.length >= 1) {
      res.send(response({
        status: true,
        msg: 'Get favorite success',
        result: getGenre
      }))
    } else {
      res.status(400).send(response({
        msg: 'Favorite list not found',
      }))
    }
  } catch (error) {
    res.status(400).send(response({
      msg: 'Something wrong, try again'
    }))
  }
}

module.exports = {
  getGenre: getGenre
}
