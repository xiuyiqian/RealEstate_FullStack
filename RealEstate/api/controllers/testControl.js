import jwt from "jsonwebtoken"

export const shouldLogin = async (req,res)=>{
    console.log(req.userId);
    res.status(200).json({message:"verifid token and success"});    
}

export const shouldAdmin = async (req,res)=>{

    const token = req.cookies.token;

    if (!token){
        return res.status(401).json({message:"not verified user"});
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload)=>{
        if (error){
            res.status(403).json({message:"token not valid"});
        }
        if (!payload.isAdmin){
            res.status(403).json({message:"not authorized user; not admin"});
        }
    } )
    res.status(200).json({message:"verifid admin authorizatoin"});
}

export const shouldLogout = async (req,res)=>{


}