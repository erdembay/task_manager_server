const routes = {
  AuthRoutes: require("./Auth"),
};

for (const key in routes) {
  module.exports[key] = routes[key];
}
