const express = require('express')
const router = express.Router()
const scoreController = require('../controllers/scoreController')

router.route('/')
    .post(scoreController.createScore)
    .patch(scoreController.addScoreQuiz)

router.route('/study')
    .get(scoreController.getScoreByStudy)

router.route('/student')
    .get(scoreController.getTotalScoreStudent)

router.route('/id')
    .get(scoreController.getScoreByid)

module.exports = router