const BaseService = require("./BaseService");
const BaseModel = require("../../models/mongo/TaskLog");
class TaskLogService extends BaseService {
  constructor() {
    super(BaseModel, "task_logs");
  }
}
module.exports = new TaskLogService();
