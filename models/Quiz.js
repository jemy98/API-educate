const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    courseid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    quizname: {
      type: String,
      required: true,
    },
    no: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
