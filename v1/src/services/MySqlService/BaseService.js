const BaseModel = null;
const BaseModelName = null;
class BaseService {
  constructor(model, modelName) {
    this.BaseModel = model;
    this.BaseModelName = modelName;
  }
  list(where) {
    return this.BaseModel.findAll(where);
  }
  async findOne(where) {
    return this.BaseModel.findOne(where);
  }
}
module.exports = BaseService;
