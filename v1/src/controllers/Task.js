const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const TaskService = require("../services/MySqlService/TaskService");
const UserService = require("../services/MySqlService/UserService");
const PriorityService = require("../services/MySqlService/PriorityService");
const AttachmentService = require("../services/MySqlService/AttachmentService");
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
          new ApiError("Görevler Listelenemedi", httpStatus.BAD_REQUEST)
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
      const response = await TaskService.create({
        title: req.body?.title,
        description: req.body?.description,
        endDate: req.body?.endDate,
        priorityId: req.body?.priorityId,
        userId: req.user?.id,
      });
      if (!response) {
        return next(
          new ApiError("Görev Oluşturulamadı", httpStatus.BAD_REQUEST)
        );
      }
      const taskId = response?.id;
      const files = req?.files || [];
      for (const file of files) {
        await AttachmentService.create({
          taskId: taskId,
          type: file?.mimetype,
          filename: file?.originalname,
          url: file?.path,
        });
      }
      res.status(httpStatus.OK).send({
        status: true,
        message: "Görev Başarıyla Oluşturuldu!",
        data: response,
      });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
  async update(req, res, next) {
    try {
      const response = await TaskService.findOneAndUpdate(
        {
          where: { id: req.params?.id },
        },
        {
          title: req.body?.title,
          description: req.body?.description,
          endDate: req.body?.endDate,
          priorityId: req.body?.priorityId,
        }
      );
      if (!response) {
        return next(
          new ApiError("Görev Güncellenemedi", httpStatus.BAD_REQUEST)
        );
      }
      res.status(httpStatus.OK).send({
        status: true,
        message: "Görev başarıyla güncellendi!",
        data: response,
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
