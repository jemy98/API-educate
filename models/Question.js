const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    courseid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Quiz'
    },
    question: {
        type: String,
        required: true
    },
    answersOptions: [{
        answerText: {type:String}, 
        isCorrect: {type:Boolean}
        
    }],
})

module.exports = mongoose.model('Question', questionSchema)