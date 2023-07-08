const mongoose = require('mongoose')

const scorequizSchema = new mongoose.Schema({
    quizid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Quiz'
    },
    quizscore: {
        type: Number,
    }
  });

const scoreSchema = new mongoose.Schema({
    studyid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Study'
    },
    scoremodul: {
        type: Number,
        default: 0
    },
    scorequiz:[scorequizSchema]
})

module.exports = mongoose.model('Score', scoreSchema)