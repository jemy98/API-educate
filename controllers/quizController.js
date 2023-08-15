const Quiz = require('../models/Quiz')
const Question= require('../models/Question')
const asyncHandler = require('express-async-handler')
const  ObjectID = require('mongodb').ObjectId;

// @desc Get all moduls
// @route GET /moduls
// @access Private
const getAllQuiz = asyncHandler(async (req, res) => {
    // Get all moduls from MongoDB
    const quiz = await Quiz.find().exec()

    // If no moduls 
    if (!quiz?.length) {
        return res.status(400).json({ message: 'No quiz found' })
    }

    res.json(quiz)
})

const getTotalQuiz = asyncHandler(async (req, res) => {
    const courseid= req.header('courseid')
    const countquiz = await Quiz.countDocuments({courseid:courseid})

    res.json(countquiz)
})

const getQuizbyId = asyncHandler(async (req, res) => {
    const  id  = req.header('id')
    const quiz = await Quiz.findById(id).exec()

    // If no moduls 
    if (!id) {
        return res.status(400).json({ message: 'modul not found' })
    }

    res.json(quiz)
})

const getQuestionbyQuiz = asyncHandler(async (req, res) => {
    const  id  = req.header('id')
    const quiz = await Question.find({quizid:id}).exec()

    // If no moduls 
    if (!id) {
        return res.status(400).json({ message: 'modul not found' })
    }

    res.json(quiz)
})

const getQuizbyCourse = asyncHandler(async (req, res) => {
    const  cid  = req.header('cid')
    const quiz = await Quiz.find({courseid:cid}).lean()

    // If no moduls 
    if (!quiz?.length) {
        return res.status(400).json({ message: "Quiz not found" })
    }

    res.json(quiz)
})

// @route POST /moduls
// @access Private
const createNewQuiz = asyncHandler(async (req, res) => {
    const {courseid, quizname } = req.body
    let no=1
    // Confirm data
    if (!courseid) {
        return res.status(400).json({ message: "Invalid Input" })
    }

    const kuis = await Quiz.findOne({courseid:courseid}).sort({no:"descending"}).exec()
    if(!kuis){
        no=1
     } else {
         no = kuis.no + 1
     }
    const quizObject = {courseid, quizname,no }

    // Create and store new modul 
    const quiz = await Quiz.create(quizObject)
    const qid= await Quiz.findOne({no:no}).exec()

    if (quiz) { //created 
        res.status(201).json({ message: `New quiz ${quizname} created` ,qid:qid._id})
    } else {
        res.status(400).json({ message: 'Invalid quiz data received' })
    }
})

const addQuestion = asyncHandler(async (req, res) => {
    const {quizdata } = req.body

    // Confirm data

    const quiz= await Question.insertMany(quizdata);

    if (quiz) { //created 
        res.status(200).json({ message: `New question created` })
    } else {
        res.status(400).json({ message: 'Invalid question data received' })
    }
})

// @desc Update a modul
// @route PATCH /moduls
// @access Private
const updateQuiz = asyncHandler(async (req, res) => {
    const { id, modulname, score, description, image, video } = req.body

    // Confirm data 
    if (!id ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the modul exist to update?
    const quiz = await Quiz.findById(id).exec()

    if (!id) {
        return res.status(400).json({ message: 'modul not found' })
    }

    // Check for duplicate 
    const duplicate = await Quiz.findOne({ modulname }).lean().exec()

    // Allow updates to the original modul 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate modulname' })
    }

    quiz.modulname = modulname
    quiz.score = score
    quiz.description = description
    quiz.image= image
    quiz.video=video

    const updatedquiz = await quiz.save()

    res.json({ message: `${updatedquiz.modulname} updated` })
})

// @desc Delete a modul
// @route DELETE /moduls
// @access Private
const deleteQuiz = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'modul ID Required' })
    }

    // Does the modul exist to delete?
    const quiz = await Quiz.findById(id).exec()

    if (!quiz) {
        return res.status(400).json({ message: 'modul not found' })
    }

    const result = await quiz.deleteOne()

    const reply = `modulname ${result.modulname} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllQuiz,
    getQuizbyId,
    getTotalQuiz,
    getQuizbyCourse,
    createNewQuiz,
    addQuestion,
    getQuestionbyQuiz,
    updateQuiz,
    deleteQuiz
}