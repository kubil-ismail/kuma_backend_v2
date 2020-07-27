require('dotenv').config()
const { APP_PORT, APP_URL, APP_DEBUG } = process.env
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

// Import Routes
const auth = require('./src/routes/api/auth.routes');
const author = require('./src/routes/api/book/author.routes');
const book = require('./src/routes/api/book/book.routes');
const favorite = require('./src/routes/api/book/favorite.routes');
const genre = require('./src/routes/api/book/genre.routes');
const home = require('./src/routes');
const review = require('./src/routes/api/book/review.routes');

// CORS SETTING
if (APP_DEBUG) {
  app.use(cors())
} else {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://192.168.1.4:8081',
    'https://kumabook-c675d.web.app'
  ]

  app.use(cors({
    origin: function (origin, callback) {
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true); if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not ' +
          'allow access from the specified Origin.'
        return callback(new Error(msg), false)
      } return callback(null, true)
    }
  }))
}

// for parsing application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set static folder root
app.use('/book/cover/', express.static('public/assets/cover'))

// ROUTES APP
app.use('/', home)
app.use('/auth', auth)
app.use('/author', author)
app.use('/book', book)
app.use('/favorite', favorite)
app.use('/genre', genre)
app.use('/review', review)

// Error Route
app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})

// Run server
app.listen(APP_PORT || 8000, () => {
  console.log(`Server run on port : ${APP_PORT}`)
  console.log(`Rest api URL:  ${APP_URL}:${APP_PORT}`)
})
