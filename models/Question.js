const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
    quizid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    question: {
      type: String,
      required: true,
    },
    options: [
        { type: String },
    ],
    correctOption: { type: Number },
    image: {
      type: String,
      default: "",
    },
  });
  
module.exports = mongoose.model("Question", questionSchema);