import { Request,Response } from "express";
import { supabase } from "../client/supabase";
import { Authentication } from "../middleware/authmiddlware";


export const profile_update= async(req: Authentication, res: Response)=>{
    const {Full_name, year, branch} = req.body;

}