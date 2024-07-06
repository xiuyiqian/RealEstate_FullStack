import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token){
        return res.status(401).json({message:"not verified user"});
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload)=>{
        if (error){
            res.status(403).json({message:"token not valid"});
        }
        req.userId = payload.id;
        next();
    });
};

export default verifyToken;