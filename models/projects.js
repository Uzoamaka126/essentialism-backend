const db = require('../db-config')

module.exports = {
  getUserProjects,
  getUserSingleProject,
  editUserProject,
  addUserProjects,
  deleteUserProjects,
  findUsersByProjects,
  getUserProjectsByValue,
  getAllProjects
}

// @TODO: Create a new project
async function addUserProjects (project) {
  try {
    const ids = await db('projects as p')
      .insert(project, 'id')
      .join('users as u', 'u.id', 'p.user_id')
      .join('values as v', 'v.id', 'p.value_id')
      .where({ 'u.id': project.user_id, 'v.id': project.value_id })
    const id = ids[0]
    const response = await findUsersByProjects(id)
    return response
  } catch (error) {
    console.log(error)
  }
}

// @TODO: Get a list of projects by user id and value id
async function getUserProjectsByValue (userId, valueId) {
  try {
    const projects = await db('projects as p')
      .join('users as u', 'u.id', 'p.user_id')
      .join('values as v', 'v.id', 'p.value_id')
      .select('p.id', 'u.id', 'project_name', 'v.value_name', 'v.description')
      .where({ 'u.id': userId })
      .andWhere({ 'v.id': valueId })
    return projects
  } catch (error) {
    console.log(error)
  }
}

// @TODO: Get all projects
async function getAllProjects () {
  try {
    const projects = await db('projects as p')
      .join('users as u', 'u.id', 'p.user_id')
      .join('values as v', 'v.id', 'p.value_id')
      .select('p.id',
        'p.user_id',
        'project_name',
        'v.value_name',
        'v.description',
        'createdAt',
        'updatedAt'
      )
    return projects
  } catch (error) {
    console.log(error)
  }
}

// @TODO: Get a list of project by user id
async function getUserProjects (userId) {
  try {
    const projects = await db('projects as p')
      .join('users as u', 'u.id', 'p.user_id')
      .join('values as v', 'v.id', 'p.value_id')
      .select(
        'p.id',
        'p.user_id',
        'p.value_id',
        'project_name',
        'v.value_name',
        'v.description',
        'createdAt',
        'updatedAt'
      )
      .where({ 'p.user_id': userId })
    return projects
  } catch (error) {
    console.log(error)
  }
}

// @TODO: Get a single project by user id and project id
async function getUserSingleProject (userId, id) {
  try {
    const project = await db('projects as p')
      .join('users as u', 'u.id', 'p.user_id')
      .join('values as v', 'v.id', 'p.value_id')
      .select('p.id',
        'p.user_id',
        'project_name',
        'v.value_name',
        'v.description',
        'createdAt',
        'updatedAt'
      )
      .where({
        'p.id': id,
        'p.user_id': userId
      })
      .first()
    return project
  } catch (error) {
    console.log(error)
  }
}

// @TODO: Edit a project by user id and project id
async function editUserProject (project, id) {
  try {
    const response = await db('projects as p')
      .join('users as u', 'u.id', 'p.user_id')
      .join('values as v', 'v.id', 'p.value_id')
      .where({ id: id })
      .update({ project_name: project.project_name })
    return response
  } catch (err) {
    console.log(err)
    return err
  }
}

// @TODO: Get a project by the project id
async function findUsersByProjects (id) {
  try {
    const response = await db('projects').where({ id: id }).first()
    return response
  } catch (error) {
    console.log(error)
  }
}

// @TODO: Delete a project based on the project id
function deleteUserProjects (id) {
  return db('projects').where({ id: id }).del()
}