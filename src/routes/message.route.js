import { privateRoute } from "../middlewares/auth.middleware.js";
import express from "express"
import { sendMessages,getMessages,getUsers } from "../controllers/message.controller.js";

const router=express.Router()

router.get('/users',privateRoute,getUsers)

router.get('/:id',privateRoute,getMessages)

router.post("/send/:id",privateRoute,sendMessages)

export default router;