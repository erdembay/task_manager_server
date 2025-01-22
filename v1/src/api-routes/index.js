const routes = {
  AuthRoutes: require("./Auth"),
  UserRoutes: require("./Users"),
};

for (const key in routes) {
  module.exports[key] = routes[key];
}
