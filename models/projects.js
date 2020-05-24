const db = require("../db-config");

module.exports = {
  getUserProjects,
  editUserProject,
  addUserProjects,
  deleteUserProjects,
  findUsersByProjects,
};

async function addUserProjects(project, userId, valueId) {
  try {
    const ids = await db("users_values_plus_projects")
      .insert(project, "id")
      .join("users as u", "u.id", "uvp.user_id")
      .join("values as v", "v.id", "uvp.value_id")
      .where({ "u.id": userId, "v.value_id": valueId });
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

async function editUserProject(name, userId, valueId, projectId) {
  try {
    const response = await db("users_values_plus_projects as uvp")
      .join("users as u", "u.id", "uvp.user_id")
      .join("values as v", "v.id", "uvp.value_id")
      .select("uvp.id", "uvp.project_name")
      .where({
        "uvp.user_id": userId,
        "uvp.value_id": valueId,
        "uvp.id": projectId
      })
      .update("uvp.project_name", name);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function findUsersByProjects(userId, projectId) {
  try {
    const response = await db("users_values_plus_projects as uvp")
      .join("users as u", "u.id", "uvp.user_id")
      .select("u.id", "uvp.project_name", "uvp.id")
      .where({ "u.id": userId, "uvp.id": projectId })
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
