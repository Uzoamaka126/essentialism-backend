module.exports = {
  errorMessage:
    "Oops! Looks like the server has lost connection. Do not fret, rather try to re-run the server again",
  registerMessage: function (username) {
    return `Shalom! Welcome Onboard ${username}!!`;
  },
  signInMessage: function (username) {
    return `Shalom! Welcome back ${username}!!`;
  },
  newValueAdded: "You have added a new value",
  newProjectAdded: "You just added a new project",
  invalid: "Invalid Credentials!",
  missingFields: "You are missing some fields!",
  badToken: "Bad Token!",
  missingToken: "Add your token to access this resource",
  updatedProject: "Project has been updated successfully",
};
