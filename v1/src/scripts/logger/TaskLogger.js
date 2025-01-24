const TaskLogService = require("../../services/MongoService/TaskLogService");
const logger = async (taskId, operation, details, userId) => {
  try {
    const log = {
      taskId,
      operation,
      details,
      userId,
    };
    await TaskLogService.create(log);
  } catch (error) {
    console.log("Hata:", error?.message);
  }
};
module.exports = {
  logger,
};
