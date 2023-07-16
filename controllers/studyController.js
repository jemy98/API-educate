const Study = require('../models/Study')
const asyncHandler = require('express-async-handler')
const  ObjectID = require('mongodb').ObjectId;

// @desc Get all users
// @route GET /users
// @access Private
const getStudybyCourse = asyncHandler(async (req, res) => {
    const { courseid } = req.header('courseid')
    const stud = await Study.find({courseid:courseid}).lean()

    // If no moduls 
    if (!stud?.length) {
        return res.status(400).json({ message: 'No moduls found' })
    }

    res.json(stud)
})

const getStudybyStudent = asyncHandler(async (req, res) => {
    const { studentid } = req.header('studentid')
    const stud = await Study.find({studentid:studentid}).lean()

    // If no moduls 
    if (!stud?.length) {
        return res.status(400).json({ message: 'No moduls found' })
    }

    res.json(stud)
})

const getStudybyId = asyncHandler(async (req, res) => {
    const { id } = req.header('id')
    const stud = await Study.findById(id).lean()

    // If no moduls 
    if (!id) {
        return res.status(400).json({ message: 'Study not found' })
    }

    res.json(stud)
})

const getTotalStudentbyCourse = asyncHandler(async (req, res) => {
    const {courseid}= req.header('id')
    const countmodul = await Study.countDocuments({courseid:courseid})

    res.json(countmodul)
})

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
    const { studyid } = req.body

    // Confirm data 
    if (!studyid) {
        return res.status(400).json({ message: "Invalid Input" })
    }

    // Does the user exist to update?
    const study = await Study.findOneAndUpdate(
        { "_id": new ObjectID(studyid)}, 
        { "$set": { 
                  "status": true
                } 
        })

    if (!study) {
        return res.status(400).json({ message: 'Study not found' })
    } else{
        res.json({ message: `Status updated` })
    }


})

const updateProgress = asyncHandler(async (req, res) => {
    const { id, courseid } = req.body

    // Confirm data 
    if (!id || !courseid ) {
        return res.status(400).json({ message: "Invalid Input" })
    }

    // Does the user exist to update?
    const study = await Study.findById(id).exec()

    if (!id) {
        return res.status(400).json({ message: 'Study not found' })
    }

    study.progress= study.progress + 1

    const updatedStudy = await study.save()

    res.json({ message: `${updatedStudy.modulname} Score updated` })
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
    getStudybyCourse,
    getStudybyStudent,
    getStudybyId,
    getTotalStudentbyCourse,
    createStudy,
    updateStudy,
    deleteStudy,
    updateProgress,
}