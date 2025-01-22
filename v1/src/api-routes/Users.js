const validate = require("../middlewares/validate");
const { authenticateToken } = require("../middlewares/authenticatePassport");
const schemas = require("../validations/Auths");
const express = require("express");
const AuthController = require("../controllers/Auth");
const router = express.Router();
router
  .route("/list")
  .get(validate(schemas.createValidation), AuthController.register);
module.exports = router;
