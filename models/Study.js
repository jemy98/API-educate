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
    scoreid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Score'
    },
    status: {
        type: Boolean,
        default: false
    },
    progressmodul: {
        type: Number,
        default:0
    },
    progressquiz: {
        type: Number,
        default:0
    }
},{timestamps: true})

module.exports = mongoose.model('Study', studySchema)