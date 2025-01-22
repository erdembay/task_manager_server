const BaseService = require("./BaseService");
const BaseModel = require("../../models/mysql/Attachments");
class AttachmentService extends BaseService {
  constructor() {
    super(BaseModel, "Attachments");
  }
}
module.exports = new AttachmentService();
