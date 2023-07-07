const express = require('express')
const router = express.Router()
const modulsController = require('../controllers/modulsController')

router.route('/')
    .get(modulsController.getAllModul)
    .post(modulsController.createNewModul)
    .patch(modulsController.updateModul)
    .delete(modulsController.deleteModul)

router.route('/id')
    .get(modulsController.getModulbyId)

router.route('/course')
    .get(modulsController.getModulbyCourse)

router.route('/total')
    .get(modulsController.getTotalModul)

module.exports = router