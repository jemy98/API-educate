const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        default: "Student"
    },
    active: {
        type: Boolean,
        default: true
    }
},{timestamps: true});

userSchema.pre("save",async function(){
    var user = this;
    if(!user.isModified("password")){
        return
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
    }catch(err){
        throw err;
    }
});

//used while signIn decrypt
userSchema.methods.comparePassword = async function (candidatePassword, cb) {
    try {
        console.log('----------------no password',this.password);
        // @ts-ignore
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        console.log(isMatch);
        return isMatch;
    } catch (error) {
        throw error;
}};

module.exports = mongoose.model('User', userSchema)