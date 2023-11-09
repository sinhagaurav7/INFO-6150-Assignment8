const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please enter your fullname'],
        trim: true,
        validate(value){
            if(!validator.isAlpha(value.replace(/\s/g,''))){
                throw new Error('Full name must only contain letters');
            }
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        trim: true,
        validate(value){
            if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value)){
                throw new Error('Password is too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            }
        }
    }
});


async function hashpassword(userSchema){
    if(userSchema.password){
        userSchema.password = await bcrypt.hash(userSchema.password, 8);
    }
}

hashpassword(userSchema).then(() => {
    console.log('Hashed password', userSchema.password);
});


const User = mongoose.model('clients', userSchema);

module.exports = User;