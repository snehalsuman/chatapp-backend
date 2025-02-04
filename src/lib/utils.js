import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const generateToken = (userId, res) => {

    const token = jwt.sign({ userId: userId },
        process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

}
