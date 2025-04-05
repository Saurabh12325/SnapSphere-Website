import sharp, { fit } from 'sharp';
import cloudinary from '../utils/cloudinary';
import { Post } from '../Models/post.model.js';
import { User } from '../Models/user.model.js';
import { Comment } from '../Models/comment.model.js';
//adding post
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

export const likePost = async (req,res)=>{
    try{
        const likeuserId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message:"Post not found",
                success:false
            })
        }           
       await post.updateOne({ $addToSet:{likes:likeuserId} })
       await post.save()
       //implemnting the socket for real time notification
       return res.status(200).json({
        message:"Post liked",
        success:true,
        
       })
    }catch(error){
        console.log(error)
    }
}


export const DislikePost = async (req,res)=>{
    try{
        const likeuserId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message:"Post not found",
                success:false
            })
        }           
       await post.updateOne({ $pull:{likes:likeuserId} })
       await post.save()
       //implemnting the socket for real time notification
       return res.status(200).json({
        message:"Post Disliked",
        success:true,
        
       })
    }catch(error){
        console.log(error)
    }
}

export const addComment = async (req,res)=>{
try{
    const postId = req.params.id;
    const userId = req.id;
    const {text} = req.body;
    const post = await Post.findById(postId);
    if(!text){
        return res.status(404).json({
            message:"text is required",
            success:false
        })
    }
    const comment = await Comment.create({
        text,
        author:userId,
        post:postId
    }).populate({path:"author",select:"username profilePicture"})
    post.comments.push(comment._id)
    await post.save()
    return res.status(201).json({
        message:"Comment added",
        success:true,
        comment
    })
    
}catch(error){
    console.log(error)
}
}

export const getCommentsOfPost = async (req,res)=>{
    try{
       const postId = req.params.id;
       const comments = await Comment.find({post:postId}).sort({createdAt:-1})
       .populate({path:'author',select:'username profilePicture'});
       if(!comments){
        return res.status(404).json({
            message:"No comments found",
            success:false
        })
       }
       return res.status(200).json({
        message:"All comments of post",
        success:true,
        comments
       })
    }catch(error){
        console.log(error)
    }
}

export const deletePost = async (req,res)=>{
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if(!post){
        return res.status(404).json({
            message:"Post not found",
            success:false
        })
    }
    //check if the post is created by the user
    if(post.author.toString() !== authorId.toString()){
        return res.status(401).json({
            message:"You are not authorized to delete this post",
            success:false
        })
    }
    await Post.findByIdAndDelete(postId);
    //remove the post from the user
    let user = await User.findById(authorId);
    user.posts  = user.posts.filter((post)=> post.toString() !== postId.toString())
    await user.save()
    //delete the comment associated with the post
    await Comment.deleteMany({post:postId})
    res.status(200).json({
        message:"Post deleted successfully",
        success:true
    })
}

export const bookmarkPost = async (req,res)=>{
    try{
   const postId = req.params.id;
   const authorId = req.id;
   const post = await Post.findById(postId);
   if(!post){
    return res.status(404).json({
        message:"Post not found",
        success:false
    })
    }
    const user = await User.findById(authorId);
    if(user.bookmarks.includes(post._id)){
       await user.updateOne({$pull:{bookmarks:post._id}})
       await user.save()
       return res.status(200).json({
        type:"unsave",
        message:"Post removed from bookmarks",
        success:true
       })
    }
    await user.updateOne({$addToSet:{bookmarks:post._id}})
    await user.save()
    return res.status(200).json({
     type:"unsave",
     message:"Post bookmarked",
     success:true
    })

}catch(error){
    console.log(error)
}
}
