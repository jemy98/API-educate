const Modul = require('../models/Modul')
const asyncHandler = require('express-async-handler')

// @desc Get all moduls
// @route GET /moduls
// @access Private
const getAllModul = asyncHandler(async (req, res) => {
    // Get all moduls from MongoDB
    const moduls = await Modul.find().lean()

    // If no moduls 
    if (!moduls?.length) {
        return res.status(400).json({ message: 'No moduls found' })
    }

    res.json(moduls)
})

const getModulbyCourse = asyncHandler(async (req, res) => {
    const  cid  = req.header('cid')
    const moduls = await Modul.find({courseid:cid}).sort({no:"ascending"}).lean()

    // If no moduls 
    if (!moduls?.length) {
        return res.status(400).json({ message: cid })
    }

    res.json(moduls)
})

const getModulbyId = asyncHandler(async (req, res) => {
    const  id  = req.header('id')
    const moduls = await Modul.findById(id).lean()

    // If no moduls 
    if (!id) {
        return res.status(400).json({ message: 'modul not found' })
    }

    res.json(moduls)
})

const getPembelajaran = asyncHandler(async (req, res) => {
    const  courseid  = req.header('courseid')
    const mod = await Modul.aggregate([
        {
            $match:{"courseid": courseid}
        },{
            $lookup:
        {
           from: "quizzes",
           localField: "courseid",
           foreignField: "courseid",
           as: "belajar"
        }
        }
    ])

    // If no moduls 
    if (!mod?.length) {
        return res.status(400).json({ message: 'No moduls found' })
    }

    res.json(mod)
})

const getNextModul = asyncHandler(async (req, res) => {
    const  id  = req.header('id')
    const moduls = await Modul.findById(id).lean()
    const number = moduls.no;
    const next = await Modul.findOne({no:{$gt:number}}).sort({no:'ascending'})
     
    if (!id) {
        return res.status(400).json({ message: 'modul not found' })
    } 

    res.json(next)
})

const getPrevModul = asyncHandler(async (req, res) => {
    const  id  = req.header('id')
    const moduls = await Modul.findById(id).lean()
    const number = moduls.no;
    const next = await Modul.findOne({no:{$lt:number}}).sort({no:'descending'})
     
    if (!id) {
        return res.status(400).json({ message: 'modul not found' })
    } 

    res.json(next)
})

const getTotalModul = asyncHandler(async (req, res) => {
    const courseid= req.header('cid')
    const countmodul = await Modul.countDocuments({courseid:courseid})

    res.json(countmodul)
})

// @route POST /moduls
// @access Private
const createNewModul = asyncHandler(async (req, res) => {
    const {courseid, modulname, description} = req.body
    let image = ""
    let no = 1
    if(req.file){
         image = image + req.file.path
    }
    // Confirm data
    if (!courseid) {
        return res.status(400).json({ message: "There is no course" })
    }
    const mod = await Modul.findOne({courseid:courseid}).sort({no:"descending"}).exec()
    if(!mod){
       no=1
    } else {
        no = mod.no + 1
    }
    const modulObject = {courseid, modulname, description, image,no }

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
    const { id, modulname, description } = req.body

    // Does the modul exist to update?
    const modul = await Modul.findById(id).exec()

    if (!id) {
        return res.status(400).json({ message: 'modul not found' })
    }
    modul.modulname = modulname
    modul.description = description

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
    getModulbyCourse,
    getTotalModul,
    getModulbyId,
    getNextModul,
    getPrevModul,
    createNewModul,
    updateModul,
    deleteModul,
    getPembelajaran,
}