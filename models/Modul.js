const mongoose = require('mongoose')

const modulSchema = new mongoose.Schema({
    instructorid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    modulname: {
        type: String,
        required: true
    },
    score: {
        type: Number,
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