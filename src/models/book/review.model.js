const db = require('../../config/database')
const table = 'book_reviews'
const table2 = 'user_details'
const table3 = 'books'

// Select all author
const getReview = (data) => {
  let query = `SELECT ${table}.*, ${table2}.fullname, ${table3}.name FROM ${table} `
  query += `JOIN ${table3} ON ${table3}.id = ${table}.book_id ` // Join Table Query
  query += `JOIN ${table2} ON ${table2}.user_id = ${table}.user_id ` // Join Table Query

  // Select by
  if (parseInt(data.query.book_id)) {
    query += `WHERE ${table}.book_id = ${parseInt(data.query.book_id)} ` // Get Where
  } else if (parseInt(data.query.user_id)) {
    query += `WHERE ${table}.user_id = ${parseInt(data.query.user_id)} ` // Get Where
  } else if (data.id) {
    query += `WHERE ${table}.id = ${parseInt(data.id, 10)}`
  }

  // Order by ID
  query += 'ORDER BY book_reviews.id DESC '

  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

// Create new review
const createReview = (data) => {
  const query = `INSERT INTO ${table} SET ?`

  return new Promise((resolve, reject) => {
    db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
  }) 
}

const deleteReview = (data) => {
  const query = `DELETE FROM ${table} WHERE ?`

  return new Promise((resolve, reject) => {
    db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

module.exports = {
  getReview: getReview,
  createReview: createReview,
  deleteReview: deleteReview,
}
