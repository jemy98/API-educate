const mongoose = require('mongoose')
const connectionpOptions = {
    dbName: "Educate"
}
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, connectionpOptions)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB