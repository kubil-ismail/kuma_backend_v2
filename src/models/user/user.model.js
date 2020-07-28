const db = require('../../config/database')
const table = 'user_details'
const table2 = 'users'
const table3 = 'user_sosmed'

// Select all user
const getUser = (data) => {
  let query = `SELECT ${table}.*, ${table2}.email, ${table2}.role_id, ${table3}.*, ${table}.id FROM ${table} `
  query += `JOIN ${table2} ON ${table}.user_id = ${table2}.id ` // Join Table Query
  query += `JOIN ${table3} ON ${table}.social_media_id = ${table3}.id ` // Join Table Query
  query += `WHERE ${table}.id = ${parseInt(data.id, 10)}`

  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

// Find user
const findUser = (data) => {
  const query = `SELECT id FROM ${table} WHERE ?`

  return new Promise((resolve, reject) => {
    db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

// Update user
const updateUser = (data) => {
  const query = `UPDATE ${table} SET ? WHERE ?`

  return new Promise((resolve, reject) => {
    db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

module.exports = {
  getUser: getUser,
  findUser: findUser,
  updateUser: updateUser
}
