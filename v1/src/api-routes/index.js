const routes = {
  AuthRoutes: require("./Auth"),
  UserRoutes: require("./Users"),
  TaskRoutes: require("./Tasks"),
};

for (const key in routes) {
  module.exports[key] = routes[key];
}
