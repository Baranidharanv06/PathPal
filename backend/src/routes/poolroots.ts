import express from "express";
import { create_pool } from "../controllers/poolcontroller";
import { authenticator } from "../middleware/authmiddlware";


const route = express.Router();
route.post("/create_pool/",authenticator,create_pool);


export default route;