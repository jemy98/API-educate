const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    instructorid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    coursename: {
        type: String,
        required: true
    }, 
    category:{
        type:String
    },
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Course', courseSchema)