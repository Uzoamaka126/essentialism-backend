const db = require("../db-config");

module.exports = {
  getTasksByProjectId,
  addNewTask,
  deleteTask,
  editTask,
  findTaskById,
};

// @TODO: Find a task by its id from the list of tasks
async function findTaskById(id) {
  try {
    const response = await db("tasks as t")
      .select(
        "id",
        "userId",
        "projectId",
        "name",
        "taskId",
        "createdAt",
        "updatedAt"
      )
      .where({ id: id })
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Create a new task
async function addNewTask(task) {
  try {
    const ids = await db("tasks as t")
      .insert(task, "id")
      .join("users as u", "u.id", "t.userId")
      .join("projects as p", "p.id", "t.projectId")
      .where({
        'u.id': task.userId,
        'p.id': task.projectId,
      });
    const id = ids[0];
    const response = await findTaskById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Get all tasks by project and user id
async function getTasksByProjectId(task) {
  try {
    const tasks = await db("tasks as t")
      .join("users as u", "u.id", "t.userId")
      .join("projects as p", "p.id", "t.projectId")
      .select(
        "t.id",
        "t.userId",
        "t.projectId",
        "p.title",
        "p.valueId",
        "t.name",
        "t.createdAt",
        "t.updatedAt"
      )
      .where({
        "t.projectId": task.projectId,
        "t.userId": task.userId,
      });
    return tasks;
  } catch (error) {
    console.log(error);
  }
}

function deleteTask(id) {
  return db("tasks_table").where({ id: id }).del();
}

async function editTask(task) {
  try {
    const response = await db("tasks_table as t")
      .join("projects as p", "p.id", "t.project_id")
      .select(
        "p.user_id",
        "t.id",
        "p.project_name",
        "task_name",
        "t.project_id",
        "createdAt",
        "updatedAt"
      )
      .where({
        "t.userId": task.userId,
        "t.project_id": task.project_id,
        "t.id": task.id,
      })
      .update("task_name", task.task_name);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
