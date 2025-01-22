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
  create(data = Object) {
    return this.BaseModel.create(data);
  }
  async findOneAndUpdate(where = Object, data = Object) {
    const response = await this.BaseModel.findOne(where);
    if (!response) {
      return null;
    }
    for (const key in data) {
      response[key] = data[key];
    }
    return response.save();
  }
  async findOneAndDelete(where = Object) {
    const response = await this.BaseModel.findOne(where);
    if (!response) {
      return null;
    }
    return response.destroy();
  }
}
module.exports = BaseService;
