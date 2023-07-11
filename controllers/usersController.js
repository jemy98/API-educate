const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').exec()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

const getAllScore = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const all = await User.find({roles:"Student"}).sort({score:'descending'}).limit(20).exec()
    
    // If no users 
    if (!all?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(all)
})

const getMyScore = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const all = await User.find({roles:"Student"}).sort({score:'descending'}).exec()
    const { id } = req.body
    const users = await User.findById(id).select('-password').lean()
    let rank = 0
    let hit = 1
    for await (const doc of all){
        if (doc._id == id) {
            rank = hit
        }
        hit++
    }
    // If no users 
    if (!users) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json({ _id: users._id, username: users.username, score: users.score, rank: rank})
})


const getUserbyId = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const { id } = req.header('id')
    const users = await User.findById(id).select('-password').lean()

    // If no users 
    if (!id) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, email, password, roles } = req.body

    // Confirm data
    if (!username || !password ) {
        return res.status(400).json({ message: username })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, email,"password": hashedPwd, roles }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, email, username, roles, active, password } = req.body

    // Confirm data 
    if (!id || !username || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active
    user.email=email

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    getUserbyId,
    getAllScore,
    getMyScore,
    createNewUser,
    updateUser,
    deleteUser
}