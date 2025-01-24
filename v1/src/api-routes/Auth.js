const validate = require("../middlewares/validate");
const { authenticateToken } = require("../middlewares/authenticate");
const passwordCheck = require("../middlewares/passwordCheck");
const schemas = require("../validations/Auths");
const express = require("express");
const AuthController = require("../controllers/Auth");
const router = express.Router();
router
  .route("/register")
  .post(
    validate(schemas.createValidation),
    passwordCheck,
    AuthController.register
  );
router
  .route("/login")
  .post(validate(schemas.loginValidation), AuthController.login);
router.route("/logout").get(authenticateToken(), AuthController.logout);
module.exports = router;
