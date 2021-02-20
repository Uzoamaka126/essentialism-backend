const { v4: uuidv4 } = require("uuid");
const { findUsersByProjects } = require("../models/projects");
const { addNewTask } = require("../models/tasks");
const { getById } = require("../models/auth");

exports.updateTask = async (task) => {
  const { userId, project_id, id } = task;

  if (!userId) {
    return {
      status: 404,
      message: "User id field is missing",
    };
  }
  if (!project_id) {
    return {
      status: 404,
      message: "Project id field is missing",
    };
  }
  if (!id) {
    return {
      status: 404,
      message: "Task id field is missing",
    };
  }

  const response = await taskData.editTask(task);
  if (!response) {
    return {
      status: 404,
      message: "Task could not be updated",
    };
  }
  return {
    status: 200,
    type: "success",
    message: "Successful",
    data: response,
  };
};

exports.createTask = async (task) => {
  if (!task.userId || !task.projectId) {
    return {
      status: 404,
      isSuccessful: false,
      message: "user or project id is missing",
    };
  }

  try {
    const checkForUser = await getById(task.userId);
    if (!checkForUser) {
      return {
        status: 404,
        isSuccessful: false,
        message: "User does not exist",
      };
    }

    const checkForProject = await findUsersByProjects(task.projectId);
    if (!checkForProject) {
      return {
        status: 404,
        isSuccessful: false,
        message: "Project does not exist",
      };
    }

    task.taskId = uuidv4();
    task.id = Math.floor(Math.random() * 1000000000);

    const response = await addNewTask(task);
    if (!response) {
      return {
        status: 200,
        isSuccessful: false,
        message: "Unable to add a new task",
      };
    }
    return {
      status: 200,
      isSuccessful: true,
      message: "Operation successful",
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

exports.fetchAllUserTasks = async (userId, project_id) => {
  if (!userId && !project_id) {
    return {
      status: 404,
      message: "user or project id is missing",
    };
  }

  const response = await taskData.getTasksByProjectId(userId, project_id);
  return {
    status: 200,
    type: "success",
    message: "Successful",
    data: {
      tasks: response,
    },
  };
};

exports.removeUserTasks = async (id) => {
  const response = await taskData.deleteTask(id);
  if (!response) {
    return {
      status: 404,
      message: "Task could not be updated",
    };
  }
  return {
    status: 200,
    type: "success",
    message: "Deleted Successfully",
  };
};
