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
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
const router = express.Router();
router.route("/").get(authenticateToken(), TaskController.getAll);
router.route("/").post(
  authenticateToken(),
  upload.array("attachment", 10), // 10 adet dosya yükleme limiti
  validate(schemas.createValidation),
  TaskController.create
);
router.route("/:id").put(
  authenticateToken(),
  upload.array("attachment", 10), // 10 adet dosya yükleme limiti
  validate(schemas.updateValidation),
  TaskController.update
);
router.route("/:id").delete(authenticateToken(), TaskController.delete);
router.route("/:id").get(authenticateToken(), TaskController.getById);
module.exports = router;
