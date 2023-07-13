const mongoose = require('mongoose')

const modulSchema = new mongoose.Schema({
    courseid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    modulname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    video: {
        type: String,
        default: ""
    },
},{timestamps: true})

module.exports = mongoose.model('Modul', modulSchema)