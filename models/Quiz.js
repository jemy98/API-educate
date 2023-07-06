const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionname: {
    type: String,
    required: true,
  },
  answersOptions: [
    {
      answerText: { type: String },
      isCorrect: { type: Boolean },
    }
  ],
  score: {
    type:Number,
  }
});

const quizSchema = new mongoose.Schema({
  courseid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  quizname: {
    type: String,
    required: true,
  },
  question:[questionSchema]
});

module.exports = mongoose.model("Quiz", quizSchema);

