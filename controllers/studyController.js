const Study = require('../models/Study')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const createStudy = asyncHandler(async (req, res) => {
    const { studentid, courseid} = req.body

    // Confirm data
    if (!studentid || !courseid ) {
        return res.status(400).json({ message: "Invalid Input" })
    }

    // Check for duplicate username
    const duplicate = await Study.findOne({ $and:[{ studentid: studentid, courseid: courseid }] }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate study' })
    }

    // Create and store new study
    const studa = await Study.create({ studentid: studentid, courseid: courseid })

    if (studa) { //created 
        res.status(201).json({ message: `New study created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

const updateStudy = asyncHandler(async (req, res) => {
    const { studentid, courseid } = req.body

    // Confirm data 
    if (!studentid || !courseid ) {
        return res.status(400).json({ message: "Invalid Input" })
    }

    // Does the user exist to update?
    const study = await Study.findOne({ $and:[{ studentid: studentid, courseid: courseid }] }).lean()

    if (!study) {
        return res.status(400).json({ message: 'Study not found' })
    }

    study.status = true

    const updatedStudy = await study.save()

    res.json({ message: `Status updated` })
})

const updateScore = asyncHandler(async (req, res) => {
    const { studentid, courseid, score } = req.body

    // Confirm data 
    if (!studentid || !courseid ) {
        return res.status(400).json({ message: "Invalid Input" })
    }

    // Does the user exist to update?
    const study = await Study.findOne({ $and:[{ studentid: studentid, courseid: courseid }] }).lean()

    if (!study) {
        return res.status(400).json({ message: 'Study not found' })
    }

    study.score = score

    const updatedStudy = await study.save()

    res.json({ message: `Score updated` })
})

const deleteStudy = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the study exist to delete?
    const study = await Study.findById(id).lean()

    if (!study) {
        return res.status(400).json({ message: 'Study not found' })
    }

    const result = await study.deleteOne()

    const reply = `Study with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    createStudy,
    updateStudy,
    deleteStudy,
    updateScore,
}