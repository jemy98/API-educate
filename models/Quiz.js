const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  courseid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  quizname: {
    type: String,
    required: true,
  }
//   ,
//   questions: [
//     {
//       questionname: {
//         type: String,
//         required: true,
//       },
//       answersOptions: [
//         {
//           answerText: { type: String },
//           isCorrect: { type: Boolean },
//         },
//       ],
//     },
//   ],
});

module.exports = mongoose.model("Quiz", quizSchema);
