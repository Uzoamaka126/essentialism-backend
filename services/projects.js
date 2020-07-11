const projectData = require("../models/projects");

exports.fetchAllUserProjects = async (userId, valueId) => {
  if (!userId) {
    return {
      status: 404,
      message: "No user id present",
    };
  };

  if (!valueId) {
    return {
      status: 404,
      message: "No value id present",
    };
  };

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
        project: response,
      },
    };
  }
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
      data: {
        project: {
          project_name: project.project_name,
          user_id: project.user_id,
          value_id: project.value_id,
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
          user_id: project.user_id,
          project_name: project.project_name,
          value_id: project.value_id,
        },
      },
    };
  }
};

exports.removeUserProjects = async (userId, project) => {
  const response = await projectData.deleteUserProjects(userId, project);
  return response;
};

/* --------- Tasks -----------------------*/
exports.fetchAllUserTasks = async (userId, valueId, projectId) => {
  const response = await projectData.getUserTasksByProjects(userId, valueId, projectId);
  if (!response) {
    return {
      status: 404,
      message: "Tasks could not be fetched",
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

exports.fetchSingleTask = async (id) => {
  const response = await projectData.getUserSingleTaskByProjects(id);
  if (!response) {
    return {
      status: 404,
      message: "Task could not be fetched",
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
