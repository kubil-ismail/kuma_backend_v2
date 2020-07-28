const sosmed = require('../../models/user/sosmed.model')
const response = require('../../helper/response')

const getSosmed = async (req, res) => {
  try {
    const { id } = req.params
    const getSosmed = await sosmed.getSosmed({ id: parseInt(id, 10) })
    if (getSosmed.length) {
      res.send(response({
        status: true,
        msg: 'Get sosmed success',
        result: getSosmed
      }))
    } else {
      res.status(400).send(response({
        msg: 'Sosmed not found'
      }))
    }
  } catch (error) {
    res.status(400).send(response({
      msg: 'Something wrong, try again'
    }))
  }
}

const updateSosmed = async (req, res) => {
  try {
    const { id } = req.params
    const check = await sosmed.findSosmed({ id: parseInt(id, 10) })
    if (check.length) {
      const updateData = req.body
      const data = [updateData, { id: parseInt(id) }]
      const update = await sosmed.updateSosmed(data)
      if (update.changedRows) {
        res.send(response({
          status: true,
          msg: 'Update Success',
          result: data
        }))
      } else {
        res.status(400).send(response({
          msg: 'Update failed'
        }))
      }
    } else {
      res.status(400).send(response({
        msg: 'User not found'
      }))
    }
  } catch (error) {
    res.status(400).send(response({
      msg: 'Something wrong, try again'
    }))
  }
}

module.exports = {
  getSosmed: getSosmed,
  updateSosmed: updateSosmed
}
