const validate = require("../middlewares/validate");
const { authenticateToken } = require("../middlewares/authenticatePassport");
const schemas = require("../validations/Auths");
const express = require("express");
const UserController = require("../controllers/User");
const router = express.Router();
router.route("/list").get(authenticateToken(), UserController.getAll);
module.exports = router;
