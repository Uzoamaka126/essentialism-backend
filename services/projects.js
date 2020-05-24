const projectData = require("../models/projects");

const project = {};

exports.fetchAllUserProjects = async (id) => {
  const response = await projectData.getUserProjects(id);
  if (!response) {
    return {
      status: 404,
      message: "Project could not be fetched",
      data: {
        projects: response,
      },
    };
  } else {
    return {
      status: 200,
      type: "success",
      message: "Successful",
      data: {
        projects: response,
      },
    };
  }
};

exports.fetchSingleProject = async (userId, projectId) => {
  const response = await projectData.findUsersByProjects(userId, projectId);
    if (!response) {
        return {
            status: 404,
            message: "Project could not be fetched",
            data: {
                project: response,
            },
        };
    } else {
        return {
            status: 200,
            type: "success",
            message: "Successful",
            data: {
                project: response
            },
        };
    }
};

exports.updateProjectName = async (name, userId, valueId, projectId) => {
  const response = await projectData.editUserProject(
    name,
    userId,
    valueId,
    projectId
  );
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
        project: {
          ...project,
          id: userId,
          project_name: response.project_name,
          project_id: projectId,
          value_id: valueId,
        },
      },
    };
  }
};

exports.createUserProject = async (project, userId, valueId) => {
  const response = await projectData.addUserProjects(
    project,
    userId,
    valueId
  );
    if (!response) {
        return {
            status: 404,
            message: "Project could not be created",
            data: {
                project: {
                    ...project,
                    id: userId,
                    project_name: response.project_name,
                    user_id: userId,
                    value_id: valueId,
                }
            }
        };
    } else {
        return {
            status: 200,
            type: "success",
            message: "Successful",
            data: {
                project: {
                    ...project,
                    id: userId,
                    project_name: response.project_name,
                    user_id: userId,
                    value_id: valueId,
                }
            },
        };
    }
};

exports.removeUserProjects = async (userId, project) => {
  const response = await projectData.deleteUserProjects(userId, project);
  return response;
};
