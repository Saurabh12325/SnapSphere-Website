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
export default messageSchema = mongoose.model('Message',messageSchema)