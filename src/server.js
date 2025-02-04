import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectToDB } from './lib/db.js'
import authRouter from "./routes/auth.route.js"
import messageRouter from "./routes/message.route.js"

dotenv.config()

connectToDB()
const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/messages',messageRouter)

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})