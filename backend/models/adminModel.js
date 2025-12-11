// const mongoose = require("mongoose");

// const AdminSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true, lowercase: true },
//   passwordHash: { type: String, required: true },
//   name: { type: String },
//   refreshTokenHash: { type: String, default: null },
//   refreshTokenExpiry: { type: Date, default: null },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Admin", AdminSchema);


const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { default: isEmail } = require("validator/lib/isEmail");

const adminSchema = new mongoose.Schema({
    name:String,
    email: {
        type: String,
        required: [true, 'Email id should be there.'],
        unique:true,
        lowercase: true,
        validate:{
            validator:isEmail,
            message:"Enter a valid email."
        }
    }, 
    password:{
        type:String,
        required:[true, "A password should be there."],
        minLength:6,
        maxLength:8,
        
        
    }, 
    passwordConfirm:{
        type: String,
        
        validate:{
            validator:function(val){
                return val === this.password;
            },
            message:"Both the password should be same;"
        }
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
    // passwordChangedAt:{
    //     type:Date,
    //     default:Date.now()
    // }
})

// encrypting  the password
adminSchema.pre('save',  async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})


// making password hidden

// function to compare the recieved password while logging in and the saved encrypted password.
adminSchema.methods.checkPassword = async function(recievedPassword, savedPassword){
    return await bcrypt.compare(recievedPassword, savedPassword);
}
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;