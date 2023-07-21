const express = require('express')
const router = express.Router()
const upload = require('../middleware/imgHandling')
const coursesController = require('../controllers/coursesController')

router.route('/')
    .get(coursesController.getAllCourse)
    .post(upload.single("image"),coursesController.createNewCourse)
    .patch(coursesController.updateCourse)
    .delete(coursesController.deleteCourse)

router.route('/id')
    .get(coursesController.getCoursebyId)

router.route('/instructor')
    .get(coursesController.getCoursebyInstructor)

router.route('/level')
    .get(coursesController.getCoursebyLevel)

router.route('/category')
    .get(coursesController.getCoursebyCategory)

router.route('/newest')
    .get(coursesController.getNewestCourse)

router.route('/study')
    .get(coursesController.getCoursebyStudy)

module.exports = router