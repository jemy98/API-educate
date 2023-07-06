const express = require('express')
const router = express.Router()
const studyController = require('../controllers/studyController')

router.route('/')
    .get(studyController.getStudybyStudent)
    .post(studyController.createStudy)
    .patch(studyController.updateStudy)
    .delete(studyController.deleteStudy)

router.route('/score')
    .patch(studyController.updateScore)

router.route('/course')
    .get(studyController.getStudybyCourse)

module.exports = router