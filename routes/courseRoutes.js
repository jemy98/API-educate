const express = require('express')
const router = express.Router()
const coursesController = require('../controllers/coursesController')

router.route('/')
    .get(coursesController.getAllCourse)
    .post(coursesController.createNewCourse)
    .patch(coursesController.updateCourse)
    .delete(coursesController.deleteCourse)

module.exports = router