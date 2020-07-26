const projectData = require("../models/projects");
const { getById } = require("../models/auth");

exports.fetchAllUserProjects = async (userId) => {
  if (!userId) {
    return {
      statusCode: 404,
      message: "No user id provided",
    };
  }
  const user = await getById(userId);

  if (!user) {
    return {
      statusCode: 404,
      message: "User does not exist",
    };
  }

  const response = await projectData.getUserProjects(userId);
    return {
      status: 200,
      type: "success",
      data: {
        projects: response
      }
    };
};

exports.fetchAllUserProjectsByValue = async (userId, valueId) => {
  if (!valueId && !userId ) {
    return {
      status: 404,
      message: "No user or value id provided",
    };
  }

  const user = await getById(userId);
  if (!user) {
    return {
      status: 404,
      message: "User does not exist",
    };
  };

  const response = await projectData.getUserProjectsByValue(userId, valueId);
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
      data: {
        project: response
      }
    };
};

exports.updateProjectName = async (projectObj) => {
  const response = await projectData.editUserProject(projectObj);
  return {
    status: 200,
    message: "Successful",
    data: response,
  };
};

exports.createUserProject = async (project) => {
  const { user_id } = project;
  if (!user_id) {
    return {
      status: 404,
      message: "User Id not provided",
    };
  }

  const response = await projectData.addUserProjects(project);
  return {
    status: 201,
    message: "Successful",
    data: response
  }
};

exports.removeUserProjects = async (id) => {
  if (!id) {
    return {
      status: 404,
      message: "Project id is not provided",
    };
  }

  const findId = await projectData.findUsersByProjects(id);
  if (!findId) {
    return {
      status: 404,
      message: "Project id does not exist",
    };
  }
  const response = await projectData.deleteUserProjects(id);
  return {
    status: 200,
    type: "success",
    message: "Deleted Successfully"
  }
};