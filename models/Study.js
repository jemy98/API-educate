const mongoose = require('mongoose')

const studySchema = new mongoose.Schema({
    studentid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    courseid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    score: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    },
    progress: {
        type:Number
    }
})

module.exports = mongoose.model('Study', studySchema)