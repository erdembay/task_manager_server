const BaseService = require("./BaseService");
const BaseModel = require("../../models/mongo/Auth");
class AuthService extends BaseService {
  constructor() {
    super(BaseModel, "auth");
  }
}
module.exports = new AuthService();
