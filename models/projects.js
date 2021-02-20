const db = require("../db-config");

module.exports = {
  getUserProjects,
  getUserSingleProject,
  editProject,
  addUserProjects,
  deleteProject,
  findUsersByProjects,
  getUserProjectsByValue,
  getAllProjects,
};

// @TODO: Get a project by the project id
async function findUsersByProjects(id) {
  try {
    const response = await db("projects as p")
      .join("users as u", "u.id", "p.userId")
      .join("values as v", "v.id", "p.valueId")
      .select(
        "p.id",
        "p.userId",
        "p.valueId",
        "p.projectId",
        "title",
        "v.value_name",
        "v.description",
        "createdAt",
        "updatedAt"
      )
      .where({ "p.id": id })
      .first();
    return response;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Create a new project
async function addUserProjects(project) {
  try {
    const ids = await db("projects as p")
      .insert(project, "id")
      .join("users as u", "u.id", "p.userId")
      .join("values as v", "v.id", "p.valueId")
      .where({ "u.id": project.userId, "v.id": project.valueId });
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
      .join("users as u", "u.id", "p.userId")
      .join("values as v", "v.id", "p.valueId")
      .select(
        "p.id",
        "p.userId",
        "title",
        "v.value_name",
        "v.description",
        "createdAt",
        "updatedAt",
        "u.id",
        "u.userId"
      );
    return projects;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Get a list of project by user id
async function getUserProjects(userId) {
  try {
    const projects = await db("projects as p")
      .join("users as u", "u.id", "p.userId")
      .join("values as v", "v.id", "p.valueId")
      .select(
        "p.id",
        "p.userId",
        "p.valueId",
        "title",
        "p.projectId",
        "v.value_name",
        "v.description",
        "createdAt",
        "updatedAt"
      )
      .where({ "u.id": userId });
    return projects;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Get a single project by user id and project id
async function getUserSingleProject(payload) {
  try {
    const project = await db("projects as p")
      .join("users as u", "u.id", "p.userId")
      .join("values as v", "v.id", "p.valueId")
      .select(
        "p.id",
        "p.userId",
        "p.valueId",
        "title",
        "p.projectId",
        "v.value_name",
        "v.description",
        "createdAt",
        "updatedAt"
      )
      .where({ "u.id": payload.userId, "p.id": payload.id })
      .first();
    return project;
  } catch (error) {
    console.log(error);
  }
}

// @TODO: Edit a project by user id and project id
async function editProject(project) {
  try {
    const ids = await db("projects as p")
      .join("users as u", "u.id", "p.userId")
      .join("values as v", "v.id", "p.valueId")
      .update({
        title: project.title,
        valueId: project.valueId,
      })
      .where({ id: project.id });
    return ids;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// @TODO: Delete a project based on the project id
function deleteProject(id) {
  return db("projects").where({ id: id }).del();
}
