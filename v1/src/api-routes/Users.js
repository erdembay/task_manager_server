const { authenticateToken } = require("../middlewares/authenticate");
const express = require("express");
const UserController = require("../controllers/User");
const router = express.Router();
router.route("/list").get(authenticateToken(), UserController.getAll);
module.exports = router;
