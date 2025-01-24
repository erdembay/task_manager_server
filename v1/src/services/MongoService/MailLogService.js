const BaseService = require("./BaseService");
const BaseModel = require("../../models/mongo/MailLog");
class MailLogService extends BaseService {
  constructor() {
    super(BaseModel, "mail_logs");
  }
}
module.exports = new MailLogService();
