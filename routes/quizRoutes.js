const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quizController')

router.route('/')
    .get(quizController.getAllQuiz)
    .post(quizController.createNewQuiz)
    .patch(quizController.updateQuiz)
    .delete(quizController.deleteQuiz)

router.route('/id')
    .get(quizController.getQuizbyId)

router.route('/question')
    .post(quizController.addQuestion)

router.route('/course')
    .get(quizController.getQuizbyCourse)

module.exports = router