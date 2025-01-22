const { authenticateToken } = require("../middlewares/authenticatePassport");
const express = require("express");
const TaskController = require("../controllers/Task");
const router = express.Router();
router.route("/").get(authenticateToken(), TaskController.getAll);
module.exports = router;
