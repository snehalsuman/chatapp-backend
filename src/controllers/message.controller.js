import Message from "../models/message.model.js"
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"

export const getUsers = async (req, res) => {

    try {

        const currentUser = req.user._id;
        const users = await User.find({
            _id: { $ne: currentUser }
        }).select("-password");

        if (!users) {
            return res.status(400).json({
                message: "No user found"
            })
        }

        return res.status(200).json({
            data:users
        })

    } catch (error) {

        return res.status(500).json({
            message: error.message
        })

    }


}

export const getMessages = async (req, res) => {

    const receiverId=req.params.id
    const senderId=req.user._id

    const messages=await Message.find({
        $or:[
            {senderId:senderId,receiverId:receiverId},
            {senderId:receiverId,receiverId:senderId}
        ]
    })

    if(!messages){
        return res.status(400).json({
            message:"No messages found"
        })
    }

    res.status(200).json({
        messages
    })

}

export const sendMessages = async (req, res) => {

    const {text,image} = req.body;
    const receiverId=req.params.id;
    const senderId=req.user._id;

    let imageUrl
    if(image){

        // upload to cloudinary
        const uploadResponse=await cloudinary.uploader.upload(image)
        imageUrl=uploadResponse.secure_url

    }

    const newMessage=new Message({

        senderId,
        receiverId,
        text,
        image:imageUrl

    })

    await newMessage.save()

    res.status(200).json({
        newMessage
    })

}