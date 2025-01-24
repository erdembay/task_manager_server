const mailEmitter = require("./MailEvents");

mailEmitter.on("sendMail", (task) => {
  console.log(task);
});
