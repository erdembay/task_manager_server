const Mongoose = require("mongoose");
// ekleme güncelleme silme işlemlerini loglamak için kullanılacak
const TaskLogSchema = new Mongoose.Schema(
  {
    taskId: {
      type: Number,
      required: true,
    },
    operation: {
      type: String,
      required: true,
      enum: ["CREATE", "UPDATE", "DELETE"],
    },
    details: {
      type: Object,
      default: {},
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
module.exports = Mongoose.model("task_log", TaskLogSchema);
