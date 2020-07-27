const db = require('../../config/database')
const table = 'books'
const table2 = 'book_genres'
const table3 = 'book_authors'
const table4 = 'book_status'

// Select all books
const getBook = (data) => {
  let query = `SELECT ${table}.*, ${table2}.name AS genre, ${table3}.name AS author, ${table4}.name AS status, ${table}.id FROM ${table} ` // Get all book
  query += `JOIN ${table2} ON ${table2}.id = ${table}.genre_id ` // Join Table Query
  query += `JOIN ${table3} ON ${table3}.id = ${table}.author_id ` // Join Table Query
  query += `JOIN ${table4} ON ${table4}.id = ${table}.status_id ` // Join Table Query

  if (data.id) {
    query += `WHERE ${table}.id = ${parseInt(data.id, 10)} ` 
  }

  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
  })
}

module.exports = {
  getBook: getBook,
}