const BaseService = require("./BaseService");
const BaseModel = require("../../models/mysql/Users");
class UserService extends BaseService {
  constructor() {
    super(BaseModel, "Users");
  }
}
module.exports = new UserService();
