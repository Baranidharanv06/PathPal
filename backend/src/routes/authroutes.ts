import express from "express";
import {login, register, debug} from '../controllers/authcontroller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/debug', debug);

export default router;