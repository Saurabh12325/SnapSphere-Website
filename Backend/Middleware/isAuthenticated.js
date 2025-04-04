
import jwt from "jsonwebtoken"
const isAuthenticated = async(req,res,next)=>{
    try{
    const token  = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"User not Authenticated",
            success:false
        })
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if(!decode){
        return res.status(401).json({
            message:"Invalid jwt verification",
            success:false
        })
    }
    console.log("Decoded Token:", decode);
    req.id = decode.userId;
    console.log("User ID from req:", req.id);

    next();
}
    catch(error){
    console.log(error)
}
}
export default isAuthenticated;