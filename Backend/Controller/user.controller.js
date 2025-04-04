import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
export const register = async (req, res) => {
    const{username,password,email} = req.body;
    try {
        if (!username || !password || !email) {
            return res.status(401).json({
                message: "Something is Missing,please check!",
                success: false
            })
        }
        const user = await User.findOne(email);
        if (user) {
            return res.status(401).json({
                message: "Try different emailId,Already Register!",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Account Created Succesfully",
            success: true
        })
    } catch (error) {
       console.log(error)
    }
}

//Login
export const login = async(req,res)=>{
    try{
        const{email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"Something is missing ,Please Check!",
                success:false
            })
        }
        let user = await User.findOne(email);
        if(!user){
            return res.status(401).json({
                message:"Incorrect Email or Password",
                success:false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(401).json({
                message:"Incorrect email or Password",
                success:false
            })
        }
        user ={
            _id:user._id,
            username:user.username,
            email:user.email,
            profilePicture:user.profilePicture,
            bio:user.bio,
            follower:user.follower,
            following:user.following,
            posts:user.posts
        }
        const token = await jwt.sign({userId:User._id},process.env.SECRET_KEY,{expiresIn:'1d'});
        return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({
            message:`Welcome back ${user.username}`,
            success:true,
            user
        })
    }catch(error){
        console.log(error)
    }
}
//logout
export const logout  = async (_,res)=>{
    try{
    return res.cookie('token',"",{maxAge:0}).json({
      message:"Logout Succesfully",
      success:true
    })
}
catch(error){
    console.log(error)
}
}
//Profile
export const getProfile = async(req,res)=>{
    try{
      const userId = req.params.id;
      let user = await findById(userId)
      return res.status(200).json({
        user,
        success:true
      })
    }catch(error){
        console.log(error)
    }
}
//Editprofile
export const editprofile = async(req,res)=>{
    try{
        const userId = req.id
        const {bio,gender} = req.body
        const profilePicture = req.file
        let cloudResponse;
          if(profilePicture){
            const fileUri = getDataUri(profilePicture)
              cloudResponse =  await cloudinary.uploader.upload(fileUri)

          }
        const user = await User.findByIdAndUpdate(userId);
        if(!user){
            return res.status(404).json({
                message:"User not Found",
                success:false
            })
        }
        if(bio) user.bio = bio;
        if(gender) user.gender = gender;
        if(profilePicture){
            user.profilePicture = cloudResponse.secure_url;
            await user.save()
            return res.status(200).json({
                message:"Profile Updated Succesfully",
                success:true,
                user
            })
        }
        
    }catch(error){
    console.log(error)
    }

}

export const getSuggestedUsers = async(req,res)=>{
    try{
        const suggestedUsers = await User.find({_id:{$ne:req.id}}).select("-password");
         if(!suggestedUsers){
            return res.status(400).json({
                message:"Currently No Suggested Users",
                success:false
            });
         }
         return res.status(200).json({
            success:true,
            users:suggestedUsers
         })
    } catch(error) {
        console.log(error);
    }
}

export const followUser = async(req,res)=>{
    try{
        const followerId = req.id;
        const followingId = req.params.id;
        if(followerId === followingId){
            return res.status(401).json({
                message:"You cannot follow yourself",
                success:false
            });
        }
        const userfollower = await User.findById(followerId);
        const following = await User.findById(followingId);
        if(!userfollower || !following){
            return res.status(401).json({
                message:"User not Found",
                success:false
            })
        }
        // check follow or unfollow 
         const isFollowing = userfollower.following.includes(followingId);
          if(isFollowing){
            
          }
          else{

          }
    }catch(error){
        console.log(error)
    }
}
