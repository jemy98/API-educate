const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    coursename: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    text: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Course', courseSchema)