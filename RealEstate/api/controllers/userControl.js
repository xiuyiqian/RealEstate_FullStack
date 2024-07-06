import prisma from "../lib/prisma.js"

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
        console.log(err)
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
    const reqBody = req.body;
    console.log(cookieUserId,userId);
    if(userId!=cookieUserId){
        return res.status(403).json(
            {message: "Not Authorized to update"}
        )
    }
    try {
        console.log("update user");
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: reqBody
        });
        console.log('User updated successfully:', updatedUser);
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
}

export const deleteUser = async (req,res) => {

}