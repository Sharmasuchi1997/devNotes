import mongoose from "mongoose";



const userSchema=mongoose.Schema({
    "name":{type:String, required:true},
    "email":{type:String, required:true},
    "password":{type:String, required:true},
    "confirmPassword":{type:String},
    "role":{type:String}
})

const UserModel=mongoose.model('user', userSchema)

export default UserModel