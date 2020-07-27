const db = require('../../config/database')
const table = 'book_genres'

// Select all genre
const getGenre = (data) => {
  const query = `SELECT * FROM ${table} ${parseInt(data.id, 10) ? 'WHERE ?' : ''}`

  return new Promise((resolve, reject) => {
    if (data.id) {
      db.query(query, data, (err, res) => err ? reject(Error(err)) : resolve(res))
    } else {
      db.query(query, (err, res) => err ? reject(Error(err)) : resolve(res))
    }
  })
}

module.exports = {
  getGenre: getGenre,
}