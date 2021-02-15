const db = require('../db-config')

module.exports = {
  getTasksByProjectId,
  addUserTasksToProjects,
  deleteTask,
  editTask
}

// @TODO: Find a task by its id from the list of tasks
async function findTasksById (id) {
  try {
    const response = await db('tasks_table as t')
      .select(
        'id',
        'userId',
        'project_id',
        'task_name',
        'createdAt',
        'updatedAt'
      )
      .where({ id: id })
      .first()
    return response
  } catch (error) {
    console.log(error)
  }
}

// @TODO: Create a new task
async function addUserTasksToProjects (task) {
  try {
    const ids = await db('tasks_table as t')
      .insert(task, 'id')
      .join('users as u', 'u.id', 't.userId')
      .join('projects as p', 'p.id', 't.project_id')
      .where({
        project_id: task.project_id,
        userId: task.userId
      })
    const id = ids[0]
    const response = await findTasksById(id)
    return response
  } catch (error) {
    console.log(error)
  }
}

// @TODO: Get all tasks by project and user id
async function getTasksByProjectId (userId, project_id) {
  try {
    const tasks = await db('tasks_table as t')
      .join('users as u', 't.userId', 'u.id')
      .join('projects as p', 'p.id', 't.project_id')
      .select(
        't.id',
        't.userId',
        't.project_id',
        'p.project_name',
        'p.value_id',
        't.task_name',
        't.createdAt',
        't.updatedAt'
      )
      .where({
        't.project_id': project_id,
        't.userId': userId
      })
    return tasks
  } catch (error) {
    console.log(error)
  }
}

function deleteTask (id) {
  return db('tasks_table').where({ id: id }).del()
}

async function editTask (task) {
  try {
    const response = await db('tasks_table as t')
      .join('projects as p', 'p.id', 't.project_id')
      .select(
        'p.user_id',
        't.id',
        'p.project_name',
        'task_name',
        't.project_id',
        'createdAt',
        'updatedAt'
      )
      .where({
        't.userId': task.userId,
        't.project_id': task.project_id,
        't.id': task.id
      })
      .update('task_name', task.task_name)
    return response
  } catch (err) {
    console.log(err)
    return err
  }
}
