const BaseModel = null;
const BaseModelName = null;
class BaseService {
  constructor(model, modelName) {
    this.BaseModel = model;
    this.BaseModelName = modelName;
  }
  list(where) {
    return this.BaseModel.find(where || {});
  }
  create(data) {
    return this.BaseModel(data).save();
  }
  async findOne(where) {
    return this.BaseModel.findOne(where);
  }
  findOneAndUpdate(where, data) {
    return this.BaseModel.findOneAndUpdate(where, data, { new: true });
  }
  findOneAndDelete(where) {
    return this.BaseModel.findOneAndDelete(where);
  }
  update(id, data) {
    return this.BaseModel.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return this.BaseModel.findByIdAndRemove(id);
  }
  deleteMany(where) {
    return this.BaseModel.deleteMany(where);
  }
}
module.exports = BaseService;
