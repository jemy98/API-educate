const mongoose = require('mongoose')

const modulSchema = new mongoose.Schema({
    instructorid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    coursename: {
        type: String,
        required: true
    },
    score: {
        type: number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
})

module.exports = mongoose.model('Modul', modulSchema)