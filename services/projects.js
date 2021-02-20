const { v4: uuidv4 } = require("uuid");
const projectData = require("../models/projects");
const { getById } = require("../models/auth");

exports.fetchAllProjects = async () => {
  const projects = await projectData.getAllProjects();
  return {
    status: 200,
    data: {
      projects: projects,
    },
  };
};

exports.fetchAllUserProjects = async (userId) => {
  if (!userId) {
    return {
      status: 404,
      message: "No user id provided",
    };
  }

  try {
    const user = await getById(userId);

    if (!user) {
      return {
        status: 404,
        message: "User does not exist",
      };
    }

    const response = await projectData.getUserProjects(userId);
    if (!response) {
      return {
        status: 200,
        isSuccessful: false,
        message: "Unable to fetch projects",
      };
    }
    return {
      status: 200,
      total: response.length,
      isSuccessful: true,
      data: {
        projects: response,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: error.response.status === 500 ? 500 : 400,
      isSuccessful: false,
    };
  }
};

exports.fetchAllUserProjectsByValue = async (userId, valueId) => {
  if (!valueId && !userId) {
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
  }

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

exports.fetchSingleProject = async (userId, id) => {
  const response = await projectData.getUserSingleProject(userId, id);
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
      project: response,
    },
  };
};

exports.updateProject = async (project) => {
  const checkForUser = await getById(project.userId);

  if (!checkForUser) {
    return {
      status: 404,
      message: "user does not exist",
    };
  }

  const checkForProject = await projectData.findProjectById(project.id);
  if (!checkForProject) {
    return {
      status: 404,
      message: "project does not exist",
    };
  }

  const response = await projectData.editProject(project);
  if (!response) {
    return {
      status: 200,
      isSuccessful: false,
      message: "Unable to update project",
    };
  } else {
    return {
      status: 200,
      isSuccessful: true,
      data: response,
    };
  }
};

exports.createUserProject = async (project) => {
  if (!project.userId) {
    return {
      status: 404,
      message: "User Id not provided",
    };
  }

  try {
    const user = await getById(project.userId);
    if (!user) {
      return {
        status: 404,
        message: "User does not exist",
      };
    }
    project.projectId = uuidv4();
    project.id = Math.floor(Math.random() * 1000000000);

    const response = await projectData.addUserProjects(project);
    if (!response) {
      return {
        status: 200,
        isSuccessful: false,
        message: "Unable to create a new project",
      };
    }
    return {
      status: 200,
      isSuccessful: true,
      data: response,
    };
  } catch (error) {
    console.log(error);
    return {
      status: error.response.status === 500 ? 500 : 400,
      isSuccessful: false,
    };
  }
};

exports.removeProject = async (id) => {
  if (!id) {
    return {
      status: 404,
      message: "Project id is not provided",
    };
  }

  const findId = await projectData.findProjectById(id);
  if (!findId) {
    return {
      status: 404,
      message: "Project id does not exist",
    };
  }
  const response = await projectData.deleteProject(id);
  if (!response) {
    return {
      status: 200,
      isSuccessful: false,
      message: "Unable to delete project",
    };
  }
  return {
    status: 200,
    isSuccessful: true,
    message: "Operation Successful",
  };
};
