const BaseService = require("./BaseService");
const BaseModel = require("../../models/mysql/Priorities");
class PriorityService extends BaseService {
  constructor() {
    super(BaseModel, "Priorities");
  }
}
module.exports = new PriorityService();
