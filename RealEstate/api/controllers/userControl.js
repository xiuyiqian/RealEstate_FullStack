import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const getUsers = async (req,res) => {
    console.log("it works get Users");
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch(error){
        console.log(err)
        res.status(500).json(
            {
                message: "Failed to get all users"
            }
        )
    }
}

export const getUser = async (req,res) => {
    const userId = req.params.id;
    console.log(userId);
    try{
        const user = await prisma.user.findUnique({
            where: {id:userId},
        });
        res.status(200).json(user);
    }catch(error){
        console.log(err);
        res.status(500).json(
            {
                message: "Failed to get the user"
            }
        )
    }
}

export const updateUser = async (req,res) => {
    const userId = req.params.id;
    //find out the id from the cookie also compare the id with the cookie id to see
    //if it is the ownwer of the account
    const cookieUserId = req.userId;
    const {password, profileImage, ...reqBody} = req.body;
    console.log({password, profileImage, ...reqBody});
    //console.log(cookieUserId,userId);
    if(userId!=cookieUserId){
        return res.status(403).json(
            {message: "Not Authorized to update"}
        )
    }

    let newEncryptedPassword = null;
    if (password){
        newEncryptedPassword = await bcrypt.hash(password,10);
    }
    console.log(reqBody);
    try {
        console.log("update user");
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            ...(newEncryptedPassword && { password:newEncryptedPassword}),
            ...reqBody,
            ...(profileImage && {profileImage: profileImage})
          }
        });
        console.log('User updated successfully:', updatedUser);
        const {password:newPassword, ...infoWithoutpwd} = updatedUser
        res.status(200).json(infoWithoutpwd);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({message:"failed to update the user"});
      }
}

export const deleteUser = async (req,res) => {
    const userId = req.params.id;
    const cookieUserId = req.userId;
    if(userId!=cookieUserId){
        return res.status(403).json(
            {message: "Not Authorized to update"}
        )
    }

    try {
        console.log("delete user");
        await prisma.user.delete({
          where: { id: userId },
        });
        console.log('User deleted successfully');
        res.status(200).json({message:"delete the user successfully"});
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({message:"failed to delete users"});
      }
}