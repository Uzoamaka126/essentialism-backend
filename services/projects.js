const projectData = require("../models/projects");

exports.fetchAllUserProjects = async (userId, valueId) => {
  const response = await projectData.getUserProjects(userId, valueId);
  if (!response) {
    return {
      status: 404,
      message: "You have no projects",
      data: {
        projects: response,
      },
    };
  }
    return {
      status: 200,
      type: "success",
      message: "Successful",
      data: {
        projects: response,
      },
    };
};

exports.fetchSingleProject = async (projectId) => {
  const response = await projectData.getUserSingleProject(projectId);
  if (!response) {
    return {
      status: 404,
      message: "This project does not exist",
    };
  }
    return {
      status: 200,
      type: "success",
      message: "Successful",
      data: response
    };
};

exports.updateProjectName = async (projectObj) => {
  const response = await projectData.editUserProject(projectObj);
  if (!response) {
    return {
      status: 404,
      message: "Project could not be created",
      data: {
        project: {
          ...project,
          id: userId,
          project_name: response,
          project_id: projectId,
          value_id: valueId,
        },
      },
    };
  } else {
    return {
      status: 200,
      type: "success",
      message: "Successful",
      data: {
        project: response,
      },
    };
  }
};

exports.createUserProject = async (project) => {
  const response = await projectData.addUserProjects(project);
  if (!response) {
    return {
      status: 404,
      message: "Project could not be created",
    };
  }
  return {
    status: 200,
    type: "success",
    message: "Successful",
    data: response
  }
};

exports.removeUserProjects = async (id) => {
  const response = await projectData.deleteUserProjects(id);
  return {
    status: 201,
    type: "success",
    message: "Deleted Successfully",
    data: response
  }
};