const routes = {
  AuthRoutes: require("./Auth"),
  UserRoutes: require("./Users"),
  TaskRoutes: require("./Tasks"),
  AttachmentRoutes: require("./Attachments"),
};

for (const key in routes) {
  module.exports[key] = routes[key];
}
