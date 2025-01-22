const config = require("./config");
config();
const fs = require("fs");
const path = require("path");
const uploadDir = path.join(
  path.dirname(require.main.filename),
  "../",
  "../",
  "uploads"
);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const express = require("express");
const cors = require("cors");
const loaders = require("./loaders");
const errorHandler = require("./middlewares/errorHandler");
const { AuthRoutes, UserRoutes, TaskRoutes } = require("./api-routes");
try {
  loaders();
} catch (errorLoaders) {
  console.log(errorLoaders.message);
}
const corsOptions = {
  origin: ["*", "http://localhost", "https://localhost"],
  credentials: true,
  allowedHeaders: ["*"],
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const server = app.listen(process.env.APP_PORT, () => {
  console.log(process.env.APP_PORT, "Portu üzerinde, Sunucu ayağa kalktı...");
  app.get("/", (req, res) => {
    res.status(200).send({
      status: true,
      message: "Bağlantı sağlanmıştır.",
    });
  });
  const routes = [
    {
      path: "/auth",
      route: AuthRoutes,
    },
    {
      path: "/users",
      route: UserRoutes,
    },
    {
      path: "/tasks",
      route: TaskRoutes,
    },
  ];
  routes.forEach((route) => {
    app.use(route.path, route.route);
  });
  app.use((req, res, next) => {
    const error = new Error("Aradığınız sayfa bulunmamaktadır.");
    error.status = 404;
    next(error);
  });
  //! Error Handler
  app.use(errorHandler);
});
global.redisCli.set("test", "test");
global.redisCli.get("test", (err, result) => {
  if (err) {
    return console.log(err?.message);
  }
  console.log(result);
});
