const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const TaskService = require("../services/MySqlService/TaskService");
const UserService = require("../services/MySqlService/UserService");
const PriorityService = require("../services/MySqlService/PriorityService");
const AttachmentService = require("../services/MySqlService/AttachmentService");
const { Op } = require("sequelize");
const { deleteTaskListCache } = require("../scripts/utils/helper");
class Tasks {
  async getAll(req, res, next) {
    const {
      status,
      priority,
      endDate,
      orderBy = "createdAt", // Varsayılan sıralama: createdAt
      sortOrder = "ASC", // Varsayılan sıralama sırası: ASC
      page = 1,
      limit = 10,
    } = req.query;
    // Filtreleme koşulları
    const offset = (page - 1) * limit;
    const where = {};
    if (status == false || status == true) {
      where.status = status;
    }
    if (priority) {
      where.priorityId = priority;
    }
    if (endDate) {
      where.endDate = { [Op.lte]: new Date(endDate) }; // endDate'e kadar olanlar
    }
    let cacheKey = `task_lists:`;
    for (const key in req.query) {
      cacheKey += `${key}_${req.query[key]}_`;
    }
    try {
      const cacheData = await global.redisCli.get(cacheKey);
      if (cacheData) {
        return res.status(httpStatus.OK).send({
          status: true,
          message: "Görevler Başarıyla Listelendi!",
          data: JSON.parse(cacheData),
        });
      }
      const { rows, count } = await TaskService.findAndCountAll({
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
        where: where,
        order: [[orderBy, sortOrder]],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
      if (!rows) {
        return next(
          new ApiError("Görevler Listelenemedi", httpStatus.BAD_REQUEST)
        );
      }
      const data = {
        totalItems: count, // Toplam kayıt sayısı
        totalPages: Math.ceil(count / limit), // Toplam sayfa sayısı
        currentPage: parseInt(page), // Mevcut sayfa numarası
        data: rows, // Döndürülen veriler
      };
      await global.redisCli.setex(cacheKey, 300, JSON.stringify(data));
      res.status(httpStatus.OK).send({
        status: true,
        message: "Görevler Başarıyla Listelendi!",
        data: data,
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
      const cacheKey = `task_lists`;
      deleteTaskListCache(cacheKey);
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
      const cacheKey = `task_lists`;
      deleteTaskListCache(cacheKey);
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
      const response = await TaskService.findOneAndDelete({
        where: { id: req.params?.id },
      });
      if (!response) {
        return next(new ApiError("Görev Silinemedi", httpStatus.BAD_REQUEST));
      }
      const cacheKey = `task_lists`;
      deleteTaskListCache(cacheKey);
      res.status(httpStatus.OK).send({
        status: true,
        message: "Görev başarıyla silindi!",
        data: response,
      });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
  async getById(req, res, next) {
    try {
      const response = await TaskService.findOne({
        where: { id: req.params?.id },
        include: [
          {
            model: UserService.BaseModel,
            as: "user",
            attributes: ["id", "username", "email"],
          },
          {
            model: PriorityService.BaseModel,
            as: "priority",
            attributes: ["id", "name"],
          },
        ],
      });
      if (!response) {
        return next(new ApiError("Görev Bulunamadı", httpStatus.BAD_REQUEST));
      }
      const responseAttachments = await AttachmentService.list({
        where: { taskId: req.params?.id },
      });
      response.dataValues.attachments = responseAttachments;
      res.status(httpStatus.OK).send({
        status: true,
        message: "Görev başarıyla getirildi!",
        data: response,
      });
    } catch (error) {
      return next(new ApiError(error?.message));
    }
  }
}
module.exports = new Tasks();
