const Course = require('../models/Course');
const Modul = require('../models/Modul');
const Study = require('../models/Study')
const asyncHandler = require('express-async-handler')
const  ObjectID = require('mongodb').ObjectId;

// @desc Get all courses
// @route GET /courses
// @access Private
const getAllCourse = asyncHandler(async (req, res) => {
    // Get all courses from MongoDB
    const courses = await Course.find().populate('instructorid').lean()

    // If no courses 
    if (!courses?.length) {
        return res.status(400).json({ message: 'No courses found' })
    }

    res.json(courses)
})

const getCoursebyInstructor = asyncHandler(async (req, res) => {
    // Get all courses from MongoDB
    const instid= req.header('instid')
    const courses = await Course.find({instructorid:instid}).lean()
    
    // If no courses 
    if (!courses?.length) {
        return res.status(400).json({ message: 'No courses found' })
    }
    res.json(courses)
})

const getCoursebyCategory = asyncHandler(async (req, res) => {
    const  category  = req.header('category')
    const courses = await Course.find({courseid:cid}).lean()

    // If no moduls 
    if (!courses?.length) {
        return res.status(400).json({ message: 'No moduls found' })
    }

    res.json(courses)
})

const getNewestCourse = asyncHandler(async (req, res) => {
    // Get all courses from MongoDB
    const instid= req.header('instid')
    const courses = await Course.find({instructorid:instid}).sort({createdAt:'descending'}).limit(3).lean()

    // If no courses 
    if (!courses?.length) {
        return res.status(400).json({ message: 'No courses found' })
    }

    res.json(courses)
})

const getCoursebyLevel = asyncHandler(async (req, res) => {
    // Get all courses from MongoDB
    const level = req.header('level')
    const courses = await Course.find({level:level}).populate('instructorid').lean()

    // If no courses 
    if (!courses?.length) {
        return res.status(400).json({ message: 'No courses found' })
    }

    res.json(courses)
})

const getCoursebyStudy = asyncHandler(async (req, res) => {
    // Get all courses from MongoDB
    const userid = req.header('userid')

    const item = await Study.find({studentid:userid}).populate('courseid').lean()
    

    // If no courses 
    if (!item?.length) {
        return res.status(400).json({ message: 'No courses found' })
    }

    res.json(item)
})

const getCoursebyId = asyncHandler(async (req, res) => {
    const  id  = req.header('id')
    const courses = await Course.findById(id).lean()

    // If no moduls 
    if (!id) {
        return res.status(400).json({ message: 'course not found' })
    }

    res.json(courses)
})


// @desc Create new course
// @route POST /courses
// @access Private
const createNewCourse = asyncHandler(async (req, res) => {
    const {instructorid, coursename, level, description } = req.body
    let image = ""
    if(req.file){
         image = image + req.file.path
    }
    // Confirm data
    if (!instructorid) {
        return res.status(400).json({ message: "Invalid Input" })
    }

    const courseObject = {instructorid, coursename, level, description, image}

    // Create and store new course 
    const course = await Course.create(courseObject)

    if (course) { //created 
        res.status(201).json({ message: `New course ${coursename} created` })
    } else {
        res.status(400).json({ message: 'Invalid course data received' })
    }
})


// @desc Update a course
// @route PATCH /courses
// @access Private
const updateCourse = asyncHandler(async (req, res) => {
    const { id, coursename, level, description } = req.body
    // let image = ""
    // if(req.file){
    //      image = image + req.file.path
    // }
    // Confirm data 
    // Does the course exist to update?
    const course = await Course.findById(id).exec()

    if (!id) {
        return res.status(400).json({ message: 'course not found' })
    }

    course.coursename = coursename
    course.level = level
    course.description = description
    // course.image= image

    const updatedcourse = await course.save()

    res.json({ message: `${updatedcourse.coursename} updated` })
})

// @desc Delete a course
// @route DELETE /courses
// @access Private
const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'course ID Required' })
    }

    // Does the course exist to delete?
    const course = await Course.findById(id).exec()

    if (!course) {
        return res.status(400).json({ message: 'course not found' })
    }

    const result = await course.deleteOne()

    const reply = `coursename ${result.coursename} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllCourse,
    getCoursebyInstructor,
    getCoursebyCategory,
    getCoursebyId,
    getCoursebyLevel,
    getCoursebyStudy,
    getNewestCourse,
    createNewCourse,
    updateCourse,
    deleteCourse,
}