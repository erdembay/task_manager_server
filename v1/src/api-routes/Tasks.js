const { authenticateToken } = require("../middlewares/authenticatePassport");
const express = require("express");
const TaskController = require("../controllers/Task");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Tasks");
const router = express.Router();
router.route("/").get(authenticateToken(), TaskController.getAll);
router
  .route("/")
  .post(
    validate(schemas.createValidation),
    authenticateToken(),
    TaskController.create
  );
module.exports = router;
