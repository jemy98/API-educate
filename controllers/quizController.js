const Quiz = require('../models/Quiz')
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

const getQuizbyId = asyncHandler(async (req, res) => {
    const { id } = req.body
    const quiz = await Quiz.findById(id).exec()

    // If no moduls 
    if (!id) {
        return res.status(400).json({ message: 'modul not found' })
    }

    res.json(quiz)
})

// @route POST /moduls
// @access Private
const createNewQuiz = asyncHandler(async (req, res) => {
    const {courseid, quizname } = req.body

    // Confirm data
    if (!courseid) {
        return res.status(400).json({ message: quizname })
    }

    const quizObject = {courseid, quizname }

    // Create and store new modul 
    const quiz = await Quiz.create(quizObject)

    if (quiz) { //created 
        res.status(201).json({ message: `New modul ${quizname} created` })
    } else {
        res.status(400).json({ message: 'Invalid modul data received' })
    }
})

const addQuestion = asyncHandler(async (req, res) => {
    const {quizid, questionname, answeroptions, score } = req.body

    // Confirm data
    if (!quizid) {
        return res.status(400).json({ message: "Invalid Input" })
    }

    const questionObject = {questionname, answeroptions, score }
    // Create and store new modul 
    const quiz = await Quiz.findOneAndUpdate(
           { "_id": new ObjectID(quizid)}, 
           { "$push": { 
                     "question": {
                       "questionname": questionname,
                        "answersOptions": answeroptions,
                       "score": score
                       }  
                   } 
           })
    if (quiz) { //created 
        res.status(201).json({ message: `New qustion ${questionname} created` })
    } else {
        res.status(400).json({ message: 'Invalid modul data received' })
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
    createNewQuiz,
    addQuestion,
    updateQuiz,
    deleteQuiz
}