import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectToDB } from './lib/db.js'
import authRouter from "./routes/auth.route.js"

dotenv.config()

connectToDB()
const app=express()
app.use(cors())


app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})