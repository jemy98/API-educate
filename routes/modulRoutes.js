const express = require('express')
const router = express.Router()
const upload = require('../middleware/imgHandling')
const modulsController = require('../controllers/modulsController')

router.route('/')
    .get(modulsController.getAllModul)
    .post(upload.single("image"),modulsController.createNewModul)
    .patch(modulsController.updateModul)
    .delete(modulsController.deleteModul)

router.route('/id')
    .get(modulsController.getModulbyId)

router.route('/course')
    .get(modulsController.getModulbyCourse)

router.route('/total')
    .get(modulsController.getTotalModul)

router.route('/next')
    .get(modulsController.getNextModul)

router.route('/prev')
    .get(modulsController.getPrevModul)

router.route('/allmateri')
    .get(modulsController.getPembelajaran)

module.exports = router