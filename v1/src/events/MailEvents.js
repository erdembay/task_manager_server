const EventEmitter = require("events");
class MailEmitter extends EventEmitter {}
const MailEmitter = new MailEmitter();
module.exports = MailEmitter;
