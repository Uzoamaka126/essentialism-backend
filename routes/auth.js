const express = require('express')
const {
  validateLoginData,
  validateSignupData
} = require('../helpers/authValidator')
const { validate } = require('../helpers/protectedMiddleware')
const { userExists } = require('../helpers/userExists')
const {
  registerUser,
  loginUser,
  deleteAllUsersService
} = require('../services/auth')
const EmailValidator = require('email-validator')
const variables = require('../helpers/variables')
const router = express.Router()

router.post('/register', validateSignupData, userExists, async (req, res) => {
  try {
    const user = req.body // {username}
    if (!user.email || !EmailValidator.validate(user.email)) {
      return res
        .status(400)
        .send({ auth: false, message: 'Email is required' })
    }
    if (!user.password) {
      return res
        .status(400)
        .send({ auth: false, message: 'Password is required' })
    }
    if (!user.username) {
      return res
        .status(400)
        .send({ auth: false, message: variables.missingUsername })
    }

    const response = await registerUser(user)
    return res.status(201).json(response)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

router.post('/login', validateLoginData, async (req, res) => {
  try {
    const user = req.body
    // check if email is valid or provided
    if (!user.email || !user.password) {
      return res.status(400).send({
        auth: false,
        message: 'Email or password is required'
      })
    }
    const response = await loginUser(user)
    // if (!response) {
    //   return res.status(400).send({
    //     auth: false,
    //     message: "Email or password is wrong",
    //   });
    // }
    res.status(response.status).json(response)
  } catch (error) {
    // res.status(500).json({
    //   error: error.message,
    // });
    console.log(error)
  }
})

//
// @TODO: Delete all users
router.delete('/delete', validate, async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return res
        .status(400)
        .send({ isSuccessful: false, message: 'Id not provided' })
    }
    const response = await deleteAllUsersService(email)
    return res.status(response.status).json(response)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
