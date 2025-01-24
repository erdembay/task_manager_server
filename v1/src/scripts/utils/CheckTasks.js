const mailEmitter = require("../../events/MailEvents");
const { Op } = require("sequelize");
const TaskService = require("../../services/MySqlService/TaskService");
const UserService = require("../../services/MySqlService/UserService");
async function checkTasks() {
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const response = await TaskService.list({
    include: [
      {
        model: UserService.BaseModel,
        as: "user", // İlişkide kullanılan alias
        attributes: ["id", "username", "email"], // Seçilen alanlar
      },
    ],
    where: {
      endDate: {
        [Op.between]: [now, tomorrow], // Şu an ile 1 gün sonrasındaki tarih arası
      },
      status: 0,
    },
  });
  if (response.length > 0) {
    response.forEach((task) => {
      const mailExample = {
        from: "",
        to: task?.user?.email,
        subject: "Görev Hatırlatma!!!",
        text: `Merhaba ${task?.user?.username}, "${
          task.title
        }" başlıklı görevinizin son tarihi ${new Date(
          task?.endDate
        ).toLocaleDateString()} 'dir.`,
      };
      mailEmitter.emit("sendMail", mailExample);
    });
  }
}

module.exports = checkTasks;
