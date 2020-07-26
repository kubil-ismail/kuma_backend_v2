const db = require('../config/database')
const table = 'users'
const table2 = 'user_activates'

// Get email from db
const findEmail = (data) => {
  const query = `SELECT email FROM ${table} WHERE ?`

  return new Promise((resolve, reject) => {
    db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res.length))
  })
}

// Get user detail from db
const findAccount = (data) => {
  const query = `SELECT * FROM ${table} WHERE ?`

  return new Promise((resolve, reject) => {
    db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

// Find code & email activate
const findCode = (data) => {
  const query = `DELETE FROM ${table2} WHERE email = '${data.email}' AND code = '${data.code}'`

  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}
// Create new user
const createUser = (data) => {
  const query = `INSERT INTO ${table} SET ?`

  return new Promise((resolve, reject) => {
    db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

// Create new user activation
const createCode = (data) => {
  const query = `INSERT INTO ${table2} SET ?`

  return new Promise((resolve, reject) => {
    db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

module.exports = {
  findEmail: findEmail,
  findAccount: findAccount,
  findCode: findCode,
  createUser: createUser,
  createCode: createCode,
}