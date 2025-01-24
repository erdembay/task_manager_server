const { authenticateToken } = require("../middlewares/authenticate");
const express = require("express");
const AttachmentController = require("../controllers/Attachment");
const router = express.Router();
router.route("/:id").delete(authenticateToken(), AttachmentController.delete);
module.exports = router;
