const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

class UserServices{
 
    static async registerUser(username,email,password,roles){
        try{
                console.log("-----Email --- Password-----",email,password);
               const userObject = { username, email, password, roles }
                const user = await User(userObject);
                return await user.save();
        }catch(err){
            throw err;
        }
    }
    static async getUserByEmail(email){
        try{
            return await User.findOne({email}).exec();
        }catch(err){
            console.log(err);
        }
    }
    static async checkUser(email){
        try {
            return await User.findOne({email}).exec();
        } catch (error) {
            throw error;
        }
    }
    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}

const register = asyncHandler(async (req, res) => {
    const { username, email, password, roles } = req.body

    // Confirm data
    if (!username || !password ) {
        return res.status(400).json({ message: username })
    }

    // Check for duplicate username
    const duplicate = await UserServices.getUserByEmail(email);

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Create and store new user 
    const user = await UserServices.registerUser(username ,email, password, roles);

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}
)

const login = asyncHandler(async (req, res) => {
    const { email, password} = req.body

    // Confirm data
    if (!email || !password ) {
        return res.status(400).json({ message : "Invalid Input" })
    }

    let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist');
        }
    
        const isPasswordCorrect = await user.comparePassword(password);
        if (isPasswordCorrect === false) {
            throw new Error(`Username or Password does not match`);
        }
        // if (!match) {
        //     throw new Error(user.password);
        // }
    let tokenData;
        tokenData = { _id: user._id, username: user.username , roles: user.roles};
        const token = await UserServices.generateAccessToken(tokenData,"secret","1h")
    if (token) { //created 
        res.status(201).json({ status: true, success: "sendData", token: token})
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}
)

const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = { register,login,logout,UserServices };