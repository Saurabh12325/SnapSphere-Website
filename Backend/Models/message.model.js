import mongoose from "mongoose";
const messageSchema = mongoose.Schema({
    SendeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    ReceiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
        required:true
    }
})
export const Message = mongoose.model('Message',messageSchema)