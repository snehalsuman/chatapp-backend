import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {

    try {

        const { fullName, email, password } = req.body

        // check if any field is empty
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // check if password length < 6
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" })
        }

        // check if user already exists
        const doesUserExist = await User.findOne({ email })

        if (doesUserExist) {
            return res.status(400).json({ message: "User already exists" })
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {

            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                message: "User created successfully",
                data: newUser
            })


        } else {
            return res.status(500).json({
                message: "Some error occured"
            })
        }


    } catch (error) {

        res.status(500).json(
            {
                message: "Internal server error"
            }
        )

    }


}

export const login = async (req, res) => {

    try {

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const doesUserExist = await User.findOne({ email })
        if (!doesUserExist) {
            res.status(404).json({
                message: "User not found"
            })
        }

        // check input password v/s hashed password
        const isValidPassword = await bcrypt.compare(password, doesUserExist.password)

        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        generateToken(doesUserExist._id, res)
        res.status(200).json({
            message: "Login successful",
            data: doesUserExist
        })

    } catch (error) {
        res.status(500).json(
            {
                message: "Internal server error"
            }
        )
    }

}

export const logout = async (req, res) => {

    try {

        res.cookie("jwt", "", {
            maxAge: 0
        })

        res.status(200).json({
            message: "Logged out successfully"
        })

    } catch (error) {
        res.status(500).json(
            {
                message: "Internal server error"
            }
        )
    }

}


export const checkAuth = async (req, res) => {
    try {

        const user = req.user
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        return res.status(200).json({
            message: "Authorized",
            data: user
        })

    } catch (error) {
        res.status(500).json(
            {
                message: "Internal server error"
            }
        )
    }
}

export const updateProfile = async (req, res) => {

    try {

        const user = req.user
        const { profilePic } = req.body

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" })
        }

        // now upload it to cloudinary

        const uploadedPic = await cloudinary.uploader.upload(profilePic)

        if (!uploadedPic) {
            return res.status(500).json({ message: "Some error occured" })
        }

        // now upload the picture to mongodb
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            profilePic: uploadedPic.secure_url
        }, {
            new: true
        })

        if (!updatedUser) {
            return res.status(500).json({ message: "Some error occured" })
        }

        res.status(200).json({
            message: "Profile picture updated successfully",
            data: updatedUser
        })

    } catch (error) {
        res.status(500).json(
            {
                message: "Internal server error"
            }
        )
    }

}
