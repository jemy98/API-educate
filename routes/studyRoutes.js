const express = require('express')
const router = express.Router()
const studyController = require('../controllers/studyController')

router.route('/')
    .post(studyController.createStudy)
    .patch(studyController.updateStudy)
    .delete(studyController.deleteStudy)

router.route('/score')
    .patch(studyController.updateScore)
    
module.exports = router