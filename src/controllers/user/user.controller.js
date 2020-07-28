const user = require('../../models/user/user.model')
const response = require('../../helper/response')

const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const getUser = await user.getUser({ id: parseInt(id, 10) })
    if (getUser.length) {
      res.send(response({
        status: true,
        msg: 'Get user success',
        result: getUser
      }))
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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const check = await user.findUser({ id: parseInt(id, 10) })
    if (check.length) {
      const updateData = req.body
      const data = [updateData, { id: parseInt(id) }]
      const update = await user.updateUser(data)
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
  getUser: getUser,
  updateUser: updateUser
}
