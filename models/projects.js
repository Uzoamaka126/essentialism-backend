const db = require("../db-config");

module.exports = {
  getUserProjects,
  getUserSingleProject,
  editUserProject,
  addUserProjects,
  deleteUserProjects,
  findUsersByProjects,
  getUserSingleTaskByProjects,
  getUserTasksByProjects,
  addUserTasksToProjects,
};

async function addUserProjects(project) {
  try {
    const ids = await db("users_values_plus_projects as uvpp")
      .insert(project, "id")
      .join("users as u", "u.id", "uvpp.user_id")
      .join("values as v", "v.id", "uvpp.value_id")
      .where({ "u.id": project.user_id, "v.id": project.value_id });
    const id = ids[0];
    const response = await findUsersByProjects(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getUserProjects(userId, valueId) {
  try {
    const projects = await db("users_values_plus_projects as uvp")
      .join("users as u", "u.id", "uvp.user_id")
      .join("values as v", "v.id", "uvp.value_id")
      .select("uvp.id", "u.id", "project_name", "v.value_name", "v.description")
      .where({ "u.id": userId })
      .andWhere({ "v.id": valueId });
    return projects;
  } catch (error) {
    console.log(error);
  }
}

async function getUserSingleProject(id) {
  try {
    const project = await db("users_values_plus_projects as uvp")
      .join("users as u", "u.id", "uvp.user_id")
      .join("values as v", "v.id", "uvp.value_id")
      .select("uvp.id", "u.id", "project_name", "v.value_name", "v.description")
      .where({ id: id });
    return project;
  } catch (error) {
    console.log(error);
  }
}

async function editUserProject(project) {
  try {
    const response = await db("users_values_plus_projects as uvp")
      .join("users as u", "u.id", "uvp.user_id")
      .join("values as v", "v.id", "uvp.value_id")
      .select("uvp.id", "u.id", "project_name", "v.value_name", "v.description")
      .where({
        user_id: project.user_id,
        value_id: project.value_id,
        id: project.project_id,
      })
      .update("project_name", project.project_name);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function findUsersByProjects(id) {
  try {
    const response = await db("users_values_plus_projects")
      .where({ id: id })
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

function deleteUserProjects(id) {
  return db("users_values_plus_projects").where({ id: id }).del();
}

async function findTasksByUser(userId) {
  try {
    const response = await db("new_users_values_projects_tasks as nuvpt")
      .join("users", "u.id", "nuvpt.user_id")
      .select("u.id", "u.user_name", "nuvpt.id")
      .where({ "u.id": userId })
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function addUserTasksToProjects(task, user_id, value_id, project_id) {
  try {
    const ids = await db("new_users_values_projects_tasks as nuvpt")
      .insert(task, "id")
      .join("users_values_plus_projects as uvpp", "uvpp.id", "nuvpt.id")
      .select("uvpp.user_id", "uvpp.value_name", "uvpp.project_name")
      .where({
        "uvpp.id": project_id,
        "uvpp.user_id": user_id,
        "uvpp.value_id": value_id,
      });
    const id = ids[0];
    const response = await findTasksByUser(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getUserTasksByProjects(user_id, value_id, project_id) {
  try {
    const tasks = await db("new_users_values_projects_tasks as nuvpt")
      .join("users_values_plus_projects as uvpp", "uvpp.id", "nuvpt.id")
      .select(
        "uvpp.user_id",
        "uvpp.value_name",
        "uvpp.project_name",
        "task_name"
      )
      .where({
        "uvpp.id": project_id,
        "uvpp.user_id": user_id,
        "uvpp.value_id": value_id,
      });
    return tasks;
  } catch (error) {
    console.log(error);
  }
}

async function getUserSingleTaskByProjects(id) {
  try {
    const task = await db("users_values_plus_projects as uvp")
      .join("users as u", "u.id", "uvp.user_id")
      .join("values as v", "v.id", "uvp.value_id")
      .select("uvp.id", "u.id", "project_name", "v.value_name", "v.description")
      .where({ id: id });
    return task;
  } catch (error) {
    console.log(error);
  }
}
