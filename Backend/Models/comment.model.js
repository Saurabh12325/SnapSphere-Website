import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    text:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:UserActivation,required:true},
    post:{type:mongoose.Schema.Type.ObjectId,ref:'Post',required:true}


})
export default commentSchema = mongoose.model('Comment',commentSchema)