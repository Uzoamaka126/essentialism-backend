const projectData = require("../models/projects");
const { getById } = require("../models/auth");

exports.fetchAllProjects = async () => {

  const projects = await projectData.getAllProjects(); 
  return {
    status: 200,
    data: {
      projects: projects
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

  const user = await getById(userId);

  if (!user) {
    return {
      statusCode: 404,
      message: "User does not exist",
    };
  }

  const projects = await projectData.getUserProjects(userId); 
  return {
    statusCode: 200,
    data: {
      projects: projects
    },
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
        project: response
      }
    };
};

exports.updateProjectName = async (project, id) => {

  const userCheck = await getById(project.user_id);
  
  if (!userCheck) {
    return {
      status: 404,
      message: "user does not exist"
    };
  }

  const idCheck = await projectData.findUsersByProjects(id);
  if (!idCheck) {
    return {
      status: 404,
      message: "project does not exist"
    };
  }

  const response = await projectData.editUserProject(project, id);
  return {
    status: 200,
    message: "Successful",
    data: {
      project: response
    },
  };
};

exports.createUserProject = async (project) => {
  const { user_id } = project;
  if (!user_id) {
    return {
      status: 404,
      message: "User Id not provided"
    };
  }

  const response = await projectData.addUserProjects(project);
  return {
    status: 201,
    message: "Successful",
    data: {
      response
    }
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