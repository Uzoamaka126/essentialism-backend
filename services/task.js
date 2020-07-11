const taskData = require("../models/projects");

exports.updateTask = async (task) => {
  const response = await taskData.editTask(task);
  if (!response) {
    return {
      status: 404,
      message: "Task could not be updated",
      data: response,
    };
  }
    return {
      status: 200,
      type: "success",
      message: "Successful",
      data: response
    };
};

exports.createUserTask = async (task) => {
  const response = await taskData.addUserTasksToProjects(task);
  if (!response) {
    return {
      status: 404,
      message: "Task could not be created",
    };
  }
  return {
    status: 200,
    type: "success",
    message: "Successful",
    data: response,
  };
};

exports.removeUserTasks = async (id) => {
  const response = await taskData.deleteTask(id);
  return {
    status: 200,
    type: "success",
    message: "Deleted Successfully",
    data: response,
  };
};

exports.fetchAllUserTasks = async (userId, valueId, projectId) => {
  const response = await taskData.getUserTasksByProjects(
    userId,
    valueId,
    projectId
  );
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
        tasks: response,
      },
    };
  }
};
