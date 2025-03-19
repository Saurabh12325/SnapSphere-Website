import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username :{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePicture:{type:String,default:''},
    bio:{type:String,default:"",},
    gender:{type:String,enum:['male','female']},
    follower:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],
    bookmarks:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}]
},{timestamps:true});

export const User = mongoose.model('User',UserSchema)