import sharp, { fit } from 'sharp';
import cloudinary from '../utils/cloudinary';
import { Post } from '../Models/post.model';
export const addPost = async (req, res) => {
    try{
     const {caption} = req.body;
     const image = req.file;
     const authorId = req.id;
     if(!image){
        return res.status(400).json({
            message:"Image is required",
            success:false
        })
     }
     //image upload to cloudinary
     const optimizedImageBuffer = await sharp(image.buffer)
     .resize({width:800,height:800,fit:'inside'})
     .toFormat('jpeg',{quality:80})
     .toBuffer();
    //buffer to data uri
     const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
     const cloudResponse = await cloudinary.uploader.upload(fileUri)
     const post = await Post.create({
        caption,
        image:cloudResponse.secure_url,
        author:authorId
     })
     const user = await User.findById(authorId).select("-password")
     if(user){
        user.posts.push(post._id)
        await user.save() 
     }
      await post.populate("author",select="-password")
     return res.status(200).json({
        message:"Post Created Successfully",
        success:true,
        post})

    }catch(error){
        console.log(error)
    }
}

export const getAllPosts = async (req,res)=>{
    try{
       const posts = await Post.find().sort({crreatedAt:-1})
       .populate({path:'author',select:'username,profilePicture'})
       .populate({path:'comments',sort:{createdAt:-1},
        populate:{path:'author',select:'username profilePicture'}})
        return res.status(200).json({
            message:"All Posts",
            success:true,
            posts
        })

    }catch(error){
        console.log(error)
    }
};

export const getUserPosts = async (req,res)=>{
    try{
       const authorId = req.id;
         const posts = await Post.find({author:authorId}).sort({createdAt:-1})
         .populate({path:'author',select:'username, profilePicture'})
         .populate({path:'comments',sort:{createdAt:-1},
            populate:{path:'author',select:'username ,profilePicture'}})
            return res.status(200).json({
                message:'get all Posts',
                success:true,
                posts
            })
    }catch(error){
        console.log(error)
    }
}


