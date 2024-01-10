
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    key:{
        type:String,
        required:false,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:false,
    },
    email:{
        type:String,
        unique:false,
    },
    password: {
        type:String,
        default :""
    },
    profilePic:{
        type:String,
        default:"",
    },
    role:{
        type:String,
        required:true
    }
    
}
);


module.exports  = mongoose.model("user",UserSchema);