import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectToDB=async()=>{

    try{

        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongodblearning.baccc.mongodb.net/Chatapp`)
        console.log('Connected to DB');

    }catch(error){
        console.log(error);
    }

}