const BaseService = require("./BaseService");
const BaseModel = require("../../models/mysql/Tasks");
class TaskService extends BaseService {
  constructor() {
    super(BaseModel, "Tasks");
  }
}
module.exports = new TaskService();
