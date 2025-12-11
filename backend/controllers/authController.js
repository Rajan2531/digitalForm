const catchAsync = require("./../utils/catchAsync")
const Admin = require("./../models/adminModel")
const appError = require("../utils/appError");
const jwt = require("jsonwebtoken")
const util = require("util");



// signing token to sent to user after signup and login
const signToken = id=>{
    return jwt.sign({_id:id}, process.env.JWT_SECRET, {expiresIn:60*1000})
}


const verifyToken = (token)=>{

}



exports.signup = catchAsync(async(req, res, next)=>{
    const {name, email, password, passwordConfirm} = req.body;
    

    // Check if the user with given email already exists
    const user = await Admin.findOne({email:email});
    if(user){
        return next(new appError(402, "Admin already exists. Please login."))
    }

    // creating new user
    const newUser = await Admin.create({name, email, password, passwordConfirm});
    console.log(newUser);
    if(!newUser){
        return next(new appError(404, "Something went wrong. Could not sign up."))
    }
    const token = signToken(newUser._id);
    
    // sending email

    
    // attaching cookie with response
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 6*1000),
        //secure:true,
        
        httpOnly:true
    })
    res.status(200).json({
        status:"success",
        data:{
            name:newUser.name,
            email:newUser.email
        },
        token
    })
})



// login handler
exports.login = catchAsync(async(req, res, next)=>{
    const {email, password} = req.body;
    console.log(email)
    if(!email || !password){
        return next(new appError(404, "Please provide with email and password."));
    }

    const user = await Admin.findOne({email:email});
    
    if(!user){
        return next(new appError(404, "Please input correct admin credentials."));
    }
    
    // checking if the recieved password is correct for the recieved email address.
    const correct = await user.checkPassword(password, user.password);
    if(!correct){
        return next(new appError(404, "Please provide correct email and password!"));
    }
    const token = signToken(user._id);
    
    //creating cookies
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 60*60*1000),
        secure:true,   // if it is set to false then the cookies are blocked by browser and will not be attached with any http request from browser side.
        httpOnly:true,
        sameSite:'none'
    })
    
    

    res.status(200).json({
        status: "success",
        user:{
            name:user.name,
            email:user.email,
        }
    })
})




exports.protect = catchAsync(async(req, res, next)=>{
    
    const token  =req.cookies?.jwt;

    if(!token){
        return next(new appError(401, "You are not logged in! Please login."))
    }
    console.log(token)
    // verifying the recieved token
    const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET)
   
    // checking if the user still exists for the id in token
    const user = await Admin.findById({_id:decoded._id});
    if(!user){
        return next(new appError(404, "The user belonging to the token does not exists"))
    }
    
    // checking if the password was changed after the token was generated. 
    // ************* implement it later *********************

    req.user = user;
    next();
})


// logging out user

exports.logout = catchAsync(async(req, res, next)=>{
    res.clearCookie('jwt');
    res.status(200).json({
        status:"success",
        message:"Logged out successfully."
    })
})


exports.me = catchAsync(async(req, res, next)=>{
    const userId = req.user._id;
    const user = await Admin.findById({_id:userId}).select('-password');
    res.status(200).json({
        status:'success',
        data:{
            email:user.email,
            name:user.name
        }
    })
})