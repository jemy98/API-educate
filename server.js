require('dotenv').config()
const express = require('express');
const app = express();
const path =require('path')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500;
const bodyparser = require('body-parser')
const cors = require('cors')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

console.log(process.env.NODE_ENV)

connectDB()

app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/uploads/coursesimg',express.static('uploads/coursesimg'))
app.use(cors())
app.use(bodyparser.json())
app.use(function (req, res, next) {
    res.header("Content-Type", 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

app.use('/users',require('./routes/userRoutes'))
app.use('/',require('./routes/authRoutes'))
app.use('/courses',require('./routes/courseRoutes'))
app.use('/modul',require('./routes/modulRoutes'))
app.use('/study',require('./routes/studyRoutes'))
app.use('/quiz',require('./routes/quizRoutes'))
app.use('/score',require('./routes/scoreRoutes'))



mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})