const taskData = require("../models/projects");

exports.updateTask = async (task) => {
  const { userId, project_id, id } = task;

  if (!userId && !project_id && !id) {
    return {
      status: 404,
      message: "An id field is missing",
    };
  }

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
  const { userId, project_id } = task;
  if (!userId && !project_id) {
    return {
      status: 404,
      message: "user or project id is missing",
    };
  };

  const response = await taskData.addUserTasksToProjects(task);
  return {
    status: 200,
    type: "success",
    message: "Successful",
    data: {
      task: response
    },
  };
};

exports.fetchAllUserTasks = async (userId, project_id) => {
  if (!userId && !project_id) {
    return {
      status: 404,
      message: "user or project id is missing",
    };
  };

  const response = await taskData.getTasksByProjectId(userId, project_id);
  return {
    status: 200,
    type: "success",
    message: "Successful",
    data: {
      tasks: response,
    }
  }
};

exports.removeUserTasks = async (id) => {
  const response = await taskData.deleteTask(id);
  return {
    status: 200,
    type: "success",
    message: "Deleted Successfully",
    response
  };
};
