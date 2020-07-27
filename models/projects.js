const db = require("../db-config");

module.exports = {
  getUserProjects,
  getUserSingleProject,
  editUserProject,
  addUserProjects,
  deleteUserProjects,
  findUsersByProjects,
  getUserTasksByProjects,
  addUserTasksToProjects,
  deleteTask,
  editTask,
  getUserProjectsByValue
};

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

async function getUserProjects(userId) {
  try {
    const projects = await db("projects as p")
      .join("users as u", "u.id", "p.user_id")
      .join("values as v", "v.id", "p.value_id")
      .select("p.id", "p.user_id"," p.value_id", "project_name", "v.value_name", "v.description")
      .where({ "p.user_id": userId })
    return projects;
  } catch (error) {
    console.log(error);
  }
}

async function getUserSingleProject(id) {
  try {
    const project = await db("projects as p")
      .join("users as u", "u.id", "p.user_id")
      .join("values as v", "v.id", "p.value_id")
      .select("p.id", "u.id", "project_name", "v.value_name", "v.description")
      .where({ id: id });
    return project;
  } catch (error) {
    console.log(error);
  }
}

async function editUserProject(project) {
  try {
    const response = await db("projects as p")
      .join("users as u", "u.id", "p.user_id")
      .join("values as v", "v.id", "u.value_id")
      .select("p.id", "u.id", "project_name", "v.value_name", "v.description")
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
    const response = await db("projects").where({ id: id }).first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

function deleteUserProjects(id) {
  return db("projects").where({ id: id }).del();
}

async function findTasksByUser(id) {
  try {
    const response = await db("tasks").where({ id: id }).first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function addUserTasksToProjects(task) {
  try {
    const ids = await db("tasks as t")
      .insert({
        project_id: task.project_id,
        task_name: task.task_name
      }, "id")
      .join("projects as p", "p.id", "t.project_id")
      .select(
        "p.user_id",
        "p.value_name",
        "p.project_name",
        "task_name",
        "isCompleted",
        "p.id"
      )
      .where({
        "p.id": task.project_id,
        "p.user_id": task.user_id,
        "p.value_id": task.value_id,
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
    const tasks = await db("tasks as t")
      .join("projects as p", "p.id", "t.project_id")
      .select("p.user_id", "p.project_name", "task_name","p.id")
      .where({
        "p.id": project_id,
        "p.user_id": user_id,
        "p.value_id": value_id,
      });
    return tasks;
  } catch (error) {
    console.log(error);
  }
}

function deleteTask(id) {
  return db("tasks").where({ id: id }).del();
}

async function editTask(task) {
  try {
    const response = await db("tasks as t")
      .join("projects as p", "p.id", "t.project_id")
      .select("p.user_id", "p.project_name", "task_name", "t.project_id")
      .where({
        project_id: task.project_id,
        id: task.id
      })
      .update("task_name", task.task_name);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// async function getUserSingleTaskByProjects(id) {
//   try {
//     const task = await db("tasks as t")
//       .join("users as u", "u.id", "t.user_id")
//       .join("values as v", "v.id", "t.value_id")
//       .select("t .id", "u.id", "project_name", "v.value_name", "v.description")
//       .where({ id: id });
//     return task;
//   } catch (error) {
//     console.log(error);
//   }
// }
