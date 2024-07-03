import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"

export const register = async (req,res) => {
    console.log("register body");

    const {username, email, password} = req.body;

    try{    
        //hash password 
        const hashPassword = await bcrypt.hash(password,10);
        //create new user and save to db
        console.log(hashPassword);
    
        const firstuser = await prisma.user.create({
            data:{
                username,
                email,
                password: hashPassword
            }
        });
        console.log(firstuser);
    
        res.status(201).json( {
            message : "User Created successfully"
        });
    
    }catch(err){
        console.log(err)
        res.status(500).json(
            {
                message: "Failed to create the User"
            }
        )
    }
}

export const login = async (req,res) => {
    const { username, password } = req.body;
    try{

    //check if there is such user; then check passsword; then generate cookie token
    //send cookie to the user

        //check user
        const user = await prisma.user.findUnique({
            where: {username:username}
        })
        if (!user){
            return res.status(401).json({
                message: "Invalid Request"
            })
        }
        //check password 
   
        const found_password = await bcrypt.compare(password,user.password);
        if (!found_password){
            return res.status(401).json({
                message: "Invalid Request"
            })
        }

        //generate cookie
        //const crypto = require('crypto');
        // #const secretKey = crypto.randomBytes(32).toString('base64');
        // #console.log('Secret Key:', secretKey);
        const cookieDuratoin = 30 * 24 * 60 * 60 * 1000

        const token = jwt.sign({
            id:user.id
        }, process.env.JWT_SECRET_KEY,{
            expiresIn: cookieDuratoin 
        })
  
        res.cookie("token", token,{
            httpOnly:true,
            maxAge: cookieDuratoin
        }).status(200).json({message:"login success"});

    }catch(err){
        console.error(err);
        res.status(500).json(
            {
                message: "Failed to Login to the website"
            }
        )
    }

}

export const logout = (req,res) => {
    res.clearCookie("token").status(200).json({
        message: "Logout Sucessful"
    })
};