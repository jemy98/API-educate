const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
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