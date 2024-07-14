import prisma from "../lib/prisma.js"


export const getPosts = async (req,res)=>{
    try{
        const posts = await prisma.post.findMany();
        res.status(200).json({
            posts
        })
    }catch(error){
        console.log("getPosts fail: "+error);
        res.status(500).json({
            "message": "getPosts fail: "+error
        })
    }
};


export const getPost = async (req,res)=>{
    try{
        const singeld = req.params.postId;
        const singlePost = await prisma.post.findUnique({
            where:{id: singeld}
        })
        res.status(200).json({
            singlePost
        })
    }catch(error){
        console.log("getPost fail: "+error);
        res.status(500).json({
            "message": "getPost fail: "+error
        })
    }
}

export const addPost = async (req,res)=>{
    const reqBody = req.body;
    //pass into user id as foreign key
    const getIDFromToken = req.userId;

    try{
        const newPost = await prisma.post.create({
            data:{
               ...reqBody,
               userId:getIDFromToken 
            },
        });
        res.status(200).json({
           newPost
        })
    }catch(error){
        console.log("add Posts fail: "+error);
        res.status(500).json({
            "message": "add Posts fail: "+error
        })
    }
}

export const putPost = async (req,res)=>{
    const postId = req.params.id;
    const getIDFromToken = req.userId;

    try{
        const findPost = await prisma.post.findUnique({
            where:{id:postId}
        })
        if (findPost && findPost.userId != getIDFromToken){
            return res.status(403).json(
                {"message": "Not Authorized to delete the post"}
            )
        }
        await prisma.post.delete({
            where : {postId}
        })
        res.status(200).json({
            "message": "post deleted"
        })
    }catch(error){
        console.log("putPost fail: "+error);
        res.status(500).json({
            "message": "putPost fail: "+error
        })
    }
}

export const deletePost = async (req,res)=>{
    try{
        res.status(200).json({
            "message": "delete the post sucessfully"
        })
    }catch(error){
        console.log("delete Posts fail: "+error);
        res.status(500).json({
            "message": "delete Posts fail: "+error
        })
    }
}
