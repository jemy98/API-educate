const Course = require('../models/Course')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all courses
// @route GET /courses
// @access Private
const getAllCourse = asyncHandler(async (req, res) => {
    // Get all courses from MongoDB
    const courses = await Course.find().select('-password').lean()

    // If no courses 
    if (!courses?.length) {
        return res.status(400).json({ message: 'No courses found' })
    }

    res.json(courses)
})

// @desc Create new course
// @route POST /courses
// @access Private
const createNewCourse = asyncHandler(async (req, res) => {
    const {instructorid, coursename, level, description, image } = req.body

    // Confirm data
    if (!instructorid) {
        return res.status(400).json({ message: coursename })
    }

    const duplicate = await Course.findOne({ coursename }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate coursename' })
    }

    const courseObject = {instructorid, coursename, level, description, image }

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
    const { id, coursename, level, description, image } = req.body

    // Confirm data 
    if (!id || !coursename ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the course exist to update?
    const course = await course.findById(id).exec()

    if (!course) {
        return res.status(400).json({ message: 'course not found' })
    }

    // Check for duplicate 
    const duplicate = await course.findOne({ coursename }).lean().exec()

    // Allow updates to the original course 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate coursename' })
    }

    course.coursename = coursename
    course.level = level
    course.description = description
    course.image= image

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
    const course = await course.findById(id).exec()

    if (!course) {
        return res.status(400).json({ message: 'course not found' })
    }

    const result = await course.deleteOne()

    const reply = `coursename ${result.coursename} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllCourse,
    createNewCourse,
    updateCourse,
    deleteCourse
}