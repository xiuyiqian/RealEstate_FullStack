import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {

    console.log(req.cookies);

    const token = req.cookies.token;

    if (!token){
        return res.status(401).json({message:"not verified user"});
    }

    const decodeToken = async (token, JWT_SECRET_KEY) => {
        try{
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            console.log('Token verified successfully. Payload:', payload);
            req.userId = payload.id;
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
        }

    }

    decodeToken(token, process.env.JWT_SECRET_KEY);
};

export default verifyToken;