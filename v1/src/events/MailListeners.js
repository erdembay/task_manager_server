const MailEmitter = require("./MailEvents");

MailEmitter.on("sendMail", (task) => {
  console.log(task);
});
