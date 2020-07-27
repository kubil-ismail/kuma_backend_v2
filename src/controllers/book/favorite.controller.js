const favorite = require('../../models/book/favorite.model')
const response = require('../../helper/response')

const getFavorite = async (req, res) => {
  try {
    const { id } = req.params
    const getFavorite = await favorite.getFavorite({ id })
    if (getFavorite.length >= 1) {
      res.send(response({
        status: true,
        msg: 'Get favorite success',
        result: getFavorite
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
  getFavorite: getFavorite
}
