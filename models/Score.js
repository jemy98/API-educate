const mongoose = require('mongoose')

const scorequizSchema = new mongoose.Schema({
    quizid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    quizscore: {
        type: Number,
    }
  });

const scoreSchema = new mongoose.Schema({
    scoremodul: {
        type: Number,
        default: 0
    },
    scorequiz:[scorequizSchema],
    totalscore:{
        type: Number,
        default: 0
    }
},{timestamps: true})

module.exports = mongoose.model('Score', scoreSchema)