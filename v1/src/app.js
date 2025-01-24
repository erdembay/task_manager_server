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
const session = require("express-session");
const cors = require("cors");
const loaders = require("./loaders");
const errorHandler = require("./middlewares/errorHandler");
const {
  AuthRoutes,
  UserRoutes,
  TaskRoutes,
  AttachmentRoutes,
} = require("./api-routes");
try {
  loaders();
} catch (errorLoaders) {
  console.log(errorLoaders.message);
}
const corsOptions = {
  origin: ["*", "http://localhost"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
const { RedisStore } = require("connect-redis");
require("./events/MailListeners");
const checkTasks = require("./scripts/utils/CheckTasks");
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  session({
    name: process.env.COOKIE_NAME,
    store: new RedisStore({
      client: global.redisCli,
      disableTouch: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 gün
      httpOnly: true, // Sadece sunucu tarafından erişilebilir
      secure: process.env.ENVIRONMENT === "production", // HTTPS üzerinden çalışır
    },
  })
);
const server = app.listen(process.env.APP_PORT, () => {
  console.log(process.env.APP_PORT, "Portu üzerinde, Sunucu ayağa kalktı...");
  app.get("/", (req, res) => {
    res.status(200).send({
      status: true,
      message: "Bağlantı sağlanmıştır.",
    });
  });
  app.use("/uploads", express.static("uploads"));
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
    {
      path: "/attachments",
      route: AttachmentRoutes,
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
checkTasks();
