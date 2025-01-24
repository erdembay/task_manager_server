const mailEmitter = require("./MailEvents");
const { logger } = require("../scripts/logger/MailLogger");
mailEmitter.on("sendMail", (mail) => {
  console.log(mail);
  logger(mail?.to, mail?.subject, mail?.text);
});
