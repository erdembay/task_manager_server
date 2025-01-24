const MailEmitter = require("../events/MailEvents");
function checkTasks() {
  const task = {
    subject: "Check Tasks",
    message: "Please check the tasks",
  };
  MailEmitter.emit("sendMail", task);
}

module.exports = checkTasks;
