import express from "express";
import { create_pool, fetchAllAvailablePools, requestToJoinPool } from "../controllers/poolcontroller";
import { authenticator } from "../middleware/authmiddlware";


const route = express.Router();
route.post("/create_pool/",authenticator,create_pool);
route.get("/fetch_pools/",authenticator,fetchAllAvailablePools);
route.post("/:poolId/request_to_join/",authenticator,requestToJoinPool);


export default route;