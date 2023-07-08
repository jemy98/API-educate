const Score = require('../models/Score')
const asyncHandler = require('express-async-handler')

const getScoreByid = asyncHandler(async (req, res) => {
    const { id } = req.body
    const score = await Score.findnyId(id).lean()

    // If no moduls 
    if (!score?.length) {
        return res.status(400).json({ message: 'No moduls found' })
    }

    res.json(score)
})



const updateScoreQuiz = asyncHandler(async (req, res) => {
    const { id, score } = req.body

    // Confirm data 
    if (!id || !courseid ) {
        return res.status(400).json({ message: "Invalid Input" })
    }

    // Does the user exist to update?
    const study = await Study.findById(id).exec()

    if (!id) {
        return res.status(400).json({ message: 'Study not found' })
    }

    study.score = study.score + 10
    study.progress= study.progress + 1

    const updatedStudy = await study.save()

    res.json({ message: `${updatedStudy.modulname} Score updated` })
})

module.exports = {
    getScoreByid,

}