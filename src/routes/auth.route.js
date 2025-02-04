import express from 'express'
import {signup,login,logout,checkAuth,updateProfile} from "../controllers/auth.controller.js"
import { privateRoute } from '../middlewares/auth.middleware.js'

const router=express.Router()

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)

router.get('/check',privateRoute,checkAuth)

router.put('/update-profile',privateRoute,updateProfile)

export default router;