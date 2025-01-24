const mailEmitter = require("../../events/MailEvents");
function checkTasks() {
  const mailExample = {
    from: "info@taskmanager.com",
    to: "usermail",
    subject: "Task Hatırlatması!",
    text: "Task başlığı ve son tarihi.",
  };
  mailEmitter.emit("sendMail", mailExample);
}

module.exports = checkTasks;
