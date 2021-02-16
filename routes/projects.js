const express = require('express')
const router = express.Router()
const service = require('../services/projects')
const { validate } = require('../helpers/protectedMiddleware')

// @TODO: Create a new project
router.post('/create', validate, async (req, res, next) => {
  try {
    const response = await service.createUserProject(req.body)
    if (!response) {
      return res.status(response.status).json(response)
    }
    res.status(response.status).json(response)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

// @TODO: Update a single project
router.put('/update', validate, async (req, res, next) => {
  try {
    const response = await service.updateProject(req.body)

    return res.status(response.status).json(response)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

// @TODO: Get a list of all projects
router.get('/projects', validate, async (req, res, next) => {
  try {
    const projects = await service.fetchAllProjects()
    res.status(projects.status).json(projects)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// @TODO: Get a list of projects by user id
router.post('/fetchProjects', validate, async (req, res, next) => {
  try {
    const userId = req.body.userId
    const result = await service.fetchAllUserProjects(userId)
    res.status(result.status).json(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// @TODO: Get single project
router.get('/:id', validate, async (req, res, next) => {
  try {
    const userId = req.user.subject
    const id = req.params.id
    const project = await service.fetchSingleProject(userId, id)

    res.status(project.status).json(project)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// @TODO: Get list of projects for a particular value
router.get('/get', validate, async (req, res) => {
  try {
    const { value_id } = req.query
    const { user_id } = req.user.subject

    if (!value_id && !user_id) {
      return res.status(404).json({
        message: 'No value id or user id was specified in the query string'
      })
    }

    const result = await service.fetchAllUserProjectsByValue(user_id, value_id)
    if (!result) {
      return res.status(result.status).json(result.message)
    }
    return res.status(result.status).json(result)
  } catch (error) {
    console.log(error)
  }
})

// @TODO: Delete a specified project by id
router.delete('/delete/:id', validate, async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return res.status(404).json({ message: 'Id not provided' })
  }

  try {
    const response = await service.removeUserProjects(id)
    return res.status(response.status).json(response)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
