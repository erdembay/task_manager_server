const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const TaskService = require("../services/MySqlService/TaskService");
const UserService = require("../services/MySqlService/UserService");
const PriorityService = require("../services/MySqlService/PriorityService");
class Tasks {
  async getAll(req, res, next) {
    try {
      const response = await TaskService.list({
        include: [
          {
            model: UserService.BaseModel,
            as: "user", // İlişkide kullanılan alias
            attributes: ["id", "username", "email"], // Seçilen alanlar
          },
          {
            model: PriorityService.BaseModel,
            as: "priority", // İlişkide kullanılan alias
            attributes: ["id", "name"], // Seçilen alanlar
          },
        ],
      });
      if (!response) {
        return next(
          new ApiError("Görevler Listelenemedi", httpStatus.NOT_FOUND)
        );
      }
      res.status(httpStatus.OK).send({
        status: true,
        message: "Görevler Başarıyla Listelendi!",
        data: response,
      });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
  async create(req, res, next) {
    try {
      const files = req.files || [];
      const uploadedFiles = files.map((file) => ({
        originalName: file.originalname,
        uploadedPath: `/uploads/${file.filename}`,
      }));
      res.status(httpStatus.OK).send({
        status: true,
        message: "Tasks Create",
      });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
  async update(req, res, next) {
    try {
      res.status(httpStatus.OK).send({
        status: true,
        message: "Tasks Update",
      });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
  async delete(req, res, next) {
    try {
      res.status(httpStatus.OK).send({
        status: true,
        message: "Tasks Delete",
      });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
}
module.exports = new Tasks();
