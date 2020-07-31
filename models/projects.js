const db = require("../db-config");

module.exports = {
  getUserProjects,
  getUserSingleProject,
  editUserProject,
  addUserProjects,
  deleteUserProjects,
  findUsersByProjects,
  getTasksByProjectId,
  addUserTasksToProjects,
  deleteTask,
  editTask,
  getUserProjectsByValue,
  getAllProjects,
};

// @TODO: Create a new project
async function addUserProjects(project) {
  try {
    const ids = await db("projects as p")
      .insert(project, "id")
      .join("users as u", "u.id", "p.user_id")
      .join("values as v", "v.id", "p.value_id")
      .where({ "u.id": project.user_id, "v.id": project.value_id });
    const id = ids[0];
    const response = await findUsersByProjects(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Get a list of projects by user id and value id
async function getUserProjectsByValue(userId, valueId) {
  try {
    const projects = await db("projects as p")
      .join("users as u", "u.id", "p.user_id")
      .join("values as v", "v.id", "p.value_id")
      .select("p.id", "u.id", "project_name", "v.value_name", "v.description")
      .where({ "u.id": userId })
      .andWhere({ "v.id": valueId });
    return projects;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Get all projects
async function getAllProjects() {
  try {
    const projects = await db("projects as p")
      .join("users as u", "u.id", "p.user_id")
      .join("values as v", "v.id", "p.value_id")
      .select("p.id", "p.user_id", "project_name", "v.value_name", "v.description")
    return projects;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Get a list of project by user id
async function getUserProjects(userId) {
  try {
    const projects = await db("projects as p")
      .join("users as u", "u.id", "p.user_id")
      .join("values as v", "v.id", "p.value_id")
      .select("p.id", "p.user_id", "p.value_id", "project_name", "v.value_name", "v.description")
      .where({ "p.user_id": userId })
    return projects;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Get a single project by user id and project id
async function getUserSingleProject(userId, id) {
  try {
    const project = await db("projects as p")
      .join("users as u", "u.id", "p.user_id")
      .join("values as v", "v.id", "p.value_id")
      .select("p.id", "p.user_id", "project_name", "v.value_name", "v.description")
      .where({
        "p.id": id,
        "p.user_id": userId
      })
      .first();
    return project;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Edit a project by user id and project id
async function editUserProject(project, id) {
  try {
    const response = await db("projects as p")
      .update({ project_name: project.project_name })
      .join("users as u", "u.id", "p.user_id")
      .join("values as v", "v.id", "p.value_id")
      .where({ "id": id })
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// @TODO: Get a project by the project id
async function findUsersByProjects(id) {
  try {
    const response = await db("projects").where({ id: id }).first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Delete a project based on the project id
function deleteUserProjects(id) {
  return db("projects").where({ id: id }).del();
}

// @TODO: Find a task by its id from the list of tasks
async function findTasksById(id) {
  try {
    const response = await db("tasks").where({ id: id }).first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Create a new task
async function addUserTasksToProjects(task) {
  try {
    const ids = await db("tasks_table as t")
      .insert(task, "id")
      .join("users as u", "u.id", "t.userId")
      .join("projects as p", "p.id", "t.project_id")
      .select(
        "u.id",
        "p.value_name",
        "p.project_name",
        "p.value_id",
        "t.userId",
        "t.project_id",
        "t.task_name",
        "t.isCompleted"
      )
      .where({
        "project_id": task.project_id,
        "userId": task.userId,
      });
    const id = ids[0];
    const response = await findTasksById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Get all tasks by project and user id
async function getTasksByProjectId(userId, project_id) {
  try {
    const tasks = await db("tasks_table as t")
      .join("users as u", "t.userId", "u.id",)
      .join("projects as p", "p.id", "t.project_id")
      .select(
        "t.id",
        "t.userId",
        "t.project_id",
        "p.project_name",
        "p.value_id",
        "t.task_name"
      )
      .where({
        "t.project_id": project_id,
        "t.userId": userId,
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
        "t.project_id"
      )
      .where({
        "t.userId": task.userId,
        "t.project_id": task.project_id,
        "t.id": task.id
      })
      .update("task_name", task.task_name);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}