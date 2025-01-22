const { authenticateToken } = require("../middlewares/authenticatePassport");
const express = require("express");
const TaskController = require("../controllers/Task");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Tasks");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
const router = express.Router();
router.route("/").get(authenticateToken(), TaskController.getAll);
router.route("/").post(
  upload.array("attachment", 10), // 10 adet dosya yükleme limiti
  validate(schemas.createValidation),
  authenticateToken(),
  TaskController.create
);
module.exports = router;
