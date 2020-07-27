const db = require('../../config/database')
const table = 'book_favorites'
const table2 = 'books'

// Select all favorite list
const getFavorite = (data) => {
  let query = `SELECT ${table}.id AS book_favorites_id, ${table2}.* FROM ${table} `
  query += `JOIN ${table2} ON ${table}.book_id = ${table2}.id WHERE ${table}.user_id = ${data.id} ` // Join Table Query
  query += `ORDER BY ${table}.id DESC `

  if (data.limit) {
    query += `LIMIT ${data.limit.start}, ${data.limit.end}` // Limit Table Query
  }

  return new Promise((resolve, reject) => {
    if (data.id) {
      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
    } else {
      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
    }
  })
}

module.exports = {
  getFavorite: getFavorite,
}
