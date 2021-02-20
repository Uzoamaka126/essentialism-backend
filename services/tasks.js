const { v4: uuidv4 } = require("uuid");
const { findProjectById } = require("../models/projects");
const {
  addNewTask,
  getTasksByProjectId,
  editTask,
  deleteTask
} = require("../models/tasks");
const { getById } = require("../models/auth");

// function checkForMissingIds(data, next) {
//   if (!data.projectId) {
//     return {
//       status: 404,
//       isSuccessful: false,
//       message: "user or project id is missing",
//     };
//   }
//   next();
// }

// async function checkForUser(id, next) {
//   const checkForExisitngUser = await getById(id);
//   if (!checkForExisitngUser) {
//     return {
//       status: 404,
//       isSuccessful: false,
//       message: "User does not exist",
//     };
//   }
//   next();
// }

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

    const checkForProject = await findProjectById(task.projectId);
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

exports.fetchAllTasks = async (task) => {
  if (!task.userId || !task.projectId) {
    return {
      status: 404,
      isSuccessful: false,
      message: "user or project id is missing",
    };
  }
  try {
    const checkForExisitngUser = await getById(task.userId);
    if (!checkForExisitngUser) {
      return {
        status: 404,
        isSuccessful: false,
        message: "User does not exist",
      };
    }
    const checkForExisitngProject = await findProjectById(task.projectId);
    if (!checkForExisitngProject) {
      return {
        status: 404,
        isSuccessful: false,
        message: "Project does not exist",
      };
    }

    const response = await getTasksByProjectId(task);
    if (!response) {
      return {
        status: 200,
        isSuccessful: false,
        message: "Operation unsuccessful",
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

exports.updateTask = async (task) => {
  if (!task.userId || !task.projectId) {
    return {
      status: 404,
      isSuccessful: false,
      message: "user or project id is missing",
    };
  }
  try {
    const checkForExisitngUser = await getById(task.userId);
    if (!checkForExisitngUser) {
      return {
        status: 404,
        isSuccessful: false,
        message: "User does not exist",
      };
    }

    const checkForExisitngProject = await findProjectById(task.projectId);
    if (!checkForExisitngProject) {
      return {
        status: 404,
        isSuccessful: false,
        message: "Project does not exist",
      };
    }

    const response = await editTask(task);
    if (!response) {
      return {
        status: 200,
        isSuccessful: false,
        message: "Operation unsuccessful",
      };
    }
    return {
      status: 200,
      isSuccessful: false,
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

exports.removeTask = async (id) => {
  const response = await deleteTask(id);
  if (!response) {
    return {
      status: 404,
      isSuccessful: false,
      message: "Task could not be deleted",
    };
  }
  return {
    status: 200,
    isSuccessful: true,
    message: "Operation Successful",
  };
};
