require('dotenv').config()
const { APP_PORT, APP_URL, APP_DEBUG } = process.env
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

// Import Routes
const home = require('./src/routes');
const auth = require('./src/routes/api/auth.routes');

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

// Set static folder root
app.use('/book/cover/', express.static('public/assets/cover'))

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// ROUTES APP
app.use('/', home)
app.use('/auth', auth)

// Error Route
app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})

// Run server
app.listen(APP_PORT || 8000, () => {
  console.log(`Server run on port : ${APP_PORT}`)
  console.log(`Rest api URL:  ${APP_URL}:${APP_PORT}`)
})
