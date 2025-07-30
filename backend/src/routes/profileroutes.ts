import express from 'express'
import { authenticator } from '../middleware/authmiddlware'
const router = express.Router()
import { profile_update } from '../controllers/profilecontroller'
import multer from 'multer'

router.post('/profile/update/',authenticator,profile_update)



