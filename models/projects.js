const db = require("../db-config");

module.exports = {
  getUserProjects,
  editUserProject,
  addUserProjects,
  deleteUserProjects,
  findUsersByProjects,
};

async function addUserProjects(project) {
  try {
    const ids = await db("users_values_plus_projects")
      .insert(project, "id")
      .join("users as u", "u.id", "uvp.user_id")
      .join("values as v", "v.id", "uvp.value_id")
      .where({ "u.id": project.user_id, "v.value_id": project.value_id });
    const id = ids[0];
    const response = await findUsersByProjects(id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getUserProjects(id) {
  try {
    const projects = await db("users_values_plus_projects as uvp")
      .join("users as u", "u.id", "uvp.user_id")
      .join("values as v", "v.id", "uvp.value_id")
      .select("uvp.id", "u.id", "project_name", "v.value_name", "v.description")
      .where({ "u.id": id });
    return projects;
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

//
async function findUsersByProjects(userId) {
  try {
    const response = await db("users_values_plus_projects as uvp")
      .join("users as u", "u.id", "uvp.user_id")
      .select("u.id", "uvp.project_name", "uvp.id")
      .where({ "u.id": userId })
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

function deleteUserProjects(userId, project) {
  return db("users_values_plus_projects")
    .whereIn("project_name", project)
    .andWhere({ id: userId })
    .del();
}
