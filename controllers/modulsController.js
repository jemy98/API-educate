const Modul = require('../models/Modul')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all moduls
// @route GET /moduls
// @access Private
const getAllModul = asyncHandler(async (req, res) => {
    // Get all moduls from MongoDB
    const moduls = await Modul.find().select('-password').lean()

    // If no moduls 
    if (!moduls?.length) {
        return res.status(400).json({ message: 'No moduls found' })
    }

    res.json(moduls)
})

// @desc Create new modul
// @route POST /moduls
// @access Private
const createNewModul = asyncHandler(async (req, res) => {
    const {instructorid, modulname, level, description, image } = req.body

    // Confirm data
    if (!instructorid) {
        return res.status(400).json({ message: modulname })
    }

    const duplicate = await Modul.findOne({ modulname }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate modulname' })
    }

    const modulObject = {instructorid, modulname, level, description, image }

    // Create and store new modul 
    const modul = await Modul.create(modulObject)

    if (modul) { //created 
        res.status(201).json({ message: `New modul ${modulname} created` })
    } else {
        res.status(400).json({ message: 'Invalid modul data received' })
    }
})

// @desc Update a modul
// @route PATCH /moduls
// @access Private
const updateModul = asyncHandler(async (req, res) => {
    const { id, modulname, level, description, image } = req.body

    // Confirm data 
    if (!id ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the modul exist to update?
    const modul = await Modul.findById(id).exec()

    if (!id) {
        return res.status(400).json({ message: 'modul not found' })
    }

    // Check for duplicate 
    const duplicate = await Modul.findOne({ modulname }).lean().exec()

    // Allow updates to the original modul 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate modulname' })
    }

    modul.modulname = modulname
    modul.level = level
    modul.description = description
    modul.image= image

    const updatedmodul = await modul.save()

    res.json({ message: `${updatedmodul.modulname} updated` })
})

// @desc Delete a modul
// @route DELETE /moduls
// @access Private
const deleteModul = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'modul ID Required' })
    }

    // Does the modul exist to delete?
    const modul = await Modul.findById(id).exec()

    if (!modul) {
        return res.status(400).json({ message: 'modul not found' })
    }

    const result = await modul.deleteOne()

    const reply = `modulname ${result.modulname} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllModul,
    createNewModul,
    updateModul,
    deleteModul
}