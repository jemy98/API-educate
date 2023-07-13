const express = require('express')
const router = express.Router()
const coursesController = require('../controllers/coursesController')

router.route('/')
    .get(coursesController.getAllCourse)
    .post(coursesController.createNewCourse)
    .patch(coursesController.updateCourse)
    .delete(coursesController.deleteCourse)

router.route('/id')
    .get(coursesController.getCoursebyId)

router.route('/instructor')
    .get(coursesController.getCoursebyInstructor)

router.route('/level')
    .get(coursesController.getCoursebyLevel)

router.route('/newest')
    .get(coursesController.getNewestCourse)

module.exports = router