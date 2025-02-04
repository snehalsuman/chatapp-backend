import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const privateRoute = async (req, res, next) => {

    try {

        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!decode) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const currentUser = await User.findById(decode.userId).select("-password")

        if (!currentUser) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        req.user = currentUser
        next()


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}