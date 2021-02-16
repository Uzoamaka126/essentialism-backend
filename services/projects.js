const { v4: uuidv4 } = require('uuid')
const projectData = require('../models/projects')
const { getById } = require('../models/auth')

exports.fetchAllProjects = async () => {
  const projects = await projectData.getAllProjects()
  return {
    status: 200,
    data: {
      projects: projects
    }
  }
}

exports.fetchAllUserProjects = async (userId) => {
  if (!userId) {
    return {
      status: 404,
      message: 'No user id provided'
    }
  }

  try {
    const user = await getById(userId)

    if (!user) {
      return {
        status: 404,
        message: 'User does not exist'
      }
    }

    const response = await projectData.getUserProjects(userId)
    if (!response) {
      return {
        status: 200,
        isSuccessful: false,
        message: 'Unable to fetch projects'
      }
    }
    return {
      status: 200,
      isSuccessful: true,
      data: {
        projects: response
      }
    }
  } catch (error) {
    console.log(error)
    return {
      status: error.response.status === 500 ? 500 : 400,
      isSuccessful: false
    }
  }
}

exports.fetchAllUserProjectsByValue = async (userId, valueId) => {
  if (!valueId && !userId) {
    return {
      status: 404,
      message: 'No user or value id provided'
    }
  }

  const user = await getById(userId)
  if (!user) {
    return {
      status: 404,
      message: 'User does not exist'
    }
  }

  const response = await projectData.getUserProjectsByValue(userId, valueId)
  return {
    status: 200,
    type: 'success',
    message: 'Successful',
    data: {
      projects: response
    }
  }
}

exports.fetchSingleProject = async (userId, id) => {
  const response = await projectData.getUserSingleProject(userId, id)
  if (!response) {
    return {
      status: 404,
      message: 'This project does not exist'
    }
  }

  return {
    status: 200,
    type: 'success',
    message: 'Successful',
    data: {
      project: response
    }
  }
}

exports.updateProjectName = async (project, id) => {
  const userCheck = await getById(project.user_id)

  if (!userCheck) {
    return {
      status: 404,
      message: 'user does not exist'
    }
  }

  const idCheck = await projectData.findUsersByProjects(id)
  if (!idCheck) {
    return {
      status: 404,
      message: 'project does not exist'
    }
  }

  const response = await projectData.editUserProject(project, id)
  return {
    status: 200,
    message: 'Successful',
    data: {
      project: response
    }
  }
}

exports.createUserProject = async (project) => {
  if (!project.userId) {
    return {
      status: 404,
      message: 'User Id not provided'
    }
  }

  try {
    const user = await getById(project.userId)
    if (!user) {
      return {
        status: 404,
        message: 'User does not exist'
      }
    }
    project.projectId = uuidv4()
    project.id = Math.floor(Math.random() * 1000000000)

    const response = await projectData.addUserProjects(project)
    if (!response) {
      return {
        status: 200,
        isSuccessful: false,
        message: 'Unable to create a new project'
      }
    }
    return {
      status: 200,
      isSuccessful: true,
      data: response
    }
  } catch (error) {
    console.log(error)
    return {
      status: error.response.status === 500 ? 500 : 400,
      isSuccessful: false
    }
  }
}

exports.removeUserProjects = async (id) => {
  if (!id) {
    return {
      status: 404,
      message: 'Project id is not provided'
    }
  }

  const findId = await projectData.findUsersByProjects(id)
  if (!findId) {
    return {
      status: 404,
      message: 'Project id does not exist'
    }
  }
  const response = await projectData.deleteUserProjects(id)
  return {
    status: 200,
    type: 'success',
    message: 'Deleted Successfully'
  }
}
