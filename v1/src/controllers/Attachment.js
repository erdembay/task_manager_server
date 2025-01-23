const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const AttachmentService = require("../services/MySqlService/AttachmentService");
class Attachments {
  async attachmentDelete(req, res, next) {
    try {
      const response = await AttachmentService.findOneAndDelete({
        where: { id: req.params?.id },
      });
      if (!response) {
        return next(new ApiError("Ek Silinemedi", httpStatus.BAD_REQUEST));
      }
      res.status(httpStatus.OK).send({
        status: true,
        message: "Ek başarıyla silindi!",
        data: response,
      });
    } catch (error) {
      next(new ApiError(error?.message));
    }
  }
}
module.exports = new Attachments();
