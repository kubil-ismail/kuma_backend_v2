require('dotenv').config()
const { APP_KEY, APP_PIN } = process.env
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')
const response = require('../helper/response')
const auth = require('../models/auth.model')

// Login account
const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const account = await auth.findAccount({ email: email })
    if (account.length >= 1) {
      // Chck status account
      if (account[0].activate === 1) {
        const passwordCheck = bcrypt.compareSync(password, account[0].password);
        if (passwordCheck) {
          // Create Api Key
          jwt.sign({account}, APP_KEY, (err, token) => {
            if (err === null) {
              res.send(response({
                status: true,
                msg: 'Login successful',
                result: {
                  apiKey: token,
                  userId: account[0].id,
                  role: account[0].role_id
                }
              }))
            } else {
              res.status(400).send(response({
                msg: 'Unable to sign in at this time, try for a few moments'
              }))
            }
          })
        } else {
          res.status(400).send(response({
            msg: 'Password not match'
          }))  
        }
      } else {
        res.status(400).send(response({
          msg: 'Please activate your account'
        }))
      }
    } else {
      res.status(400).send(response({
        msg: 'Email not registered'
      })) 
    }
  } catch (error) {
    res.status(400).send(response({
      msg: 'Something wrong, try again'
    }))
  }
}

// Create new account
const register = async (req, res) => {
  const { email, password } = req.body
  const uniqid = Math.floor(1000 + Math.random() * 9000)
  try {
    const checkEmail = await auth.findEmail({ email: email })
    if (checkEmail === 0) {
      const data = {
        email: email,
        password: bcrypt.hashSync(password, salt),
        role_id: 1
      }
      const created = await auth.createUser(data)
      await auth.createCode({ email: email, code: uniqid })
      res.send(response({
        status: true,
        msg: 'Registration successful',
        result: {
          userId: created.insertId,
          email: email
        }
      }))
    } else {
      res.status(400).send(response({
        msg: 'Email already registered'
      }))
    }
  } catch (error) {
    res.status(400).send(response({
      msg: 'Something wrong, try again'
    }))
  }
}

// Activate account
const activate = async (req, res) => {
  const { email, code } = req.body
  try {
    const checkEmail = await auth.findEmail({ email: email })
    if (checkEmail === 1) {
      const checkCode = await auth.findCode({ email: email, code: code })
      if (checkCode.affectedRows === 1) {
        res.send(response({
          msg: 'Activation successful'
        }))
      } else {
        res.status(400).send(response({
          msg: 'Invalid code'
        }))
      }
    } else {
      res.status(400).send(response({
        msg: 'Email not found'
      }))
    }
  } catch (error) {
    res.status(400).send(response({
      msg: 'Something wrong, try again'
    }))
  }
}

module.exports = {
  login: login,
  register: register,
  activate: activate,
}
