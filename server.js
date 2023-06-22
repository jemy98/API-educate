require('dotenv').config()
const express = require('express');
const app = express();
const path =require('path')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV)

connectDB()

app.use('/',express.static(path.join(__dirname,'/public')))

app.use('/',require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})