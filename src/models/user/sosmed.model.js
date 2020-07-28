const db = require('../../config/database')
const table = 'user_sosmed'

// Select all sosmed
const getSosmed = (data) => {
  const query = `SELECT * FROM ${table} ${parseInt(data.id) ? 'WHERE ?' : ''}`

  return new Promise((resolve, reject) => {
    db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

// Find sosmed
const findSosmed = (data) => {
  const query = `SELECT id FROM ${table} WHERE ?`

  return new Promise((resolve, reject) => {
    db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

// Update sosmed
const updateSosmed = (data) => {
  const query = `UPDATE ${table} SET ? WHERE ?`

  return new Promise((resolve, reject) => {
    db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

module.exports = {
  getSosmed: getSosmed,
  findSosmed: findSosmed,
  updateSosmed: updateSosmed
}
