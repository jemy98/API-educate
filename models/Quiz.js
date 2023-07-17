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
  image: {
    type: String
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
  score: {
    type:Number,
  },
  question:[questionSchema]
},{timestamps: true});

module.exports = mongoose.model("Quiz", quizSchema);

