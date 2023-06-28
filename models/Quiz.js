const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    courseid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    quizname: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Question', questionSchema)