const MailLogService = require("../../services/MongoService/MailLogService");
const logger = async (to, subject, text) => {
  try {
    const log = {
      to,
      subject,
      text,
    };
    await MailLogService.create(log);
  } catch (error) {
    console.log("Hata:", error?.message);
  }
};
module.exports = {
  logger,
};
