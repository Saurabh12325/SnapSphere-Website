import { Conversation } from "../Models/conversation.model";
import { Message } from "../Models/message.model";
//sending message
export const sendMessage = async (req, res) => {
    try{
         const senderId = req.id;
         const receiverId = req.params.id;
            const {message} = req.body;
            let conversation = await Conversationrsation.findOne({
                participants: { $all: [senderId, receiverId] }
            })
            //establishing the conversation if not found
            if(!conversation){
                conversation = await conversation.create({
                    participants: [senderId, receiverId]
                })
            }
            const newMessage = await Message.create({
                senderId,
                receiverId,
                message,
            });
            if(newMessage) conversation.messages.push(newMessage._id);
            await Promise.all([conversation.save(), newMessage.save()])
            //implement socket io here

            return res.status(201).json({
                message:"Message sent successfully",
                success:true,
                conversation,
                newMessage
            })
    }catch(error){
        console.log(error)
    }
}
//get messsages of a conversation
export const getMessages = async (req, res) => {
    try{
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })
        if(!conversation){
            return res.status(200).json({
                message:[],
                success:true
            })
        }                   
        return res.status(200).json({
            message:conversation?.messages,
            success:true,
            
        })
    }catch(error){
        console.log(error)
    }
}