import { Request, Response } from "express"
import { supabase } from "../client/supabase";
import { Authentication} from "../middleware/authmiddlware";
import * as supabaseService from '../services/supabaseService';

export const create_pool = async (req: Authentication, res: Response ) => {

const {origin,destination,date, time,seats, mode} =req.body;

if (!origin || typeof origin !== 'string' || origin.trim().length < 3 || origin.trim().length > 100) {
    return res.status(402).json({message: 'Origin is required and must be a string between 3 and 100 characters.'});
}
if (!destination || typeof destination !== 'string' || destination.trim().length < 3 || destination.trim().length > 100) {
        return res.status(402).json({message: 'Origin is required and must be a string between 3 and 100 characters.'});
}
 const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
if (!date || !dateRegex.test(date)) {
    return res.status(402).json({message: 'Date is required and must be in YYYY-MM-DD format.'});
}

const timeRegex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;
if (!time || typeof time !== 'string' || !timeRegex.test(time)) {
    return res.status(402).json({message: 'Time is required and must be in HH:MM (24-hour) format.'});
    }

if (typeof seats !== 'number' || !Number.isInteger(seats) || seats < 1 || seats > 10) { // Example max seats: 10
    return res.status(402).json({message: 'Available seats must be an integer between 1 and 10.'});
    }

const email = req.user?.email;

console.log(email);

if (typeof email !== 'string') {
  return res.status(402).json({message: 'invalid email.'})
}



const {data: userfetch, error: fetcherror} = await supabase
.from('profiles')
.select('username')
.ilike('email',email)
.single()

if(fetcherror|| !userfetch){
  return res.status(402).json({message: 'no username found..'});
}

const username = userfetch.username;


const {error:inserterror} = await supabase
.from('pools')
.insert({
    origin: origin,
    destination: destination,
    departure_date: date,
    departure_time: time,
    available_seats:seats,
    pooler: username,
    Mode: mode

})
if (inserterror) {
    console.error('Insert error:', inserterror?.message);
    return res.status(500).json({ message: 'Insert Error. Check console ' });
    
  }
  res.status(201).json({ message: 'Pool created.' });
};


export const fetchAllAvailablePools = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('pools')
      .select(`
        *
      `)
      .eq('status', 'scheduled');

    if (error) {
      console.error('Error fetching pools:', error.message);
      throw error;
    }
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching available pools' });
  }
};

export const requestToJoinPool = async (req: Authentication, res: Response) => {
    // The passenger's ID comes directly from the authMiddleware after a user logs in.
    // This is more secure and efficient than looking it up by email.

    const Passengeremail = req.user?.email;

    // It's good practice to ensure the PassengerId from the token is valid.
    if (!Passengeremail) {
        return res.status(401).json({ message: 'Authentication error: User Email not found.' });
    }

    try {

    const {data: pasid,error:iderror}= await supabase
    .from('profiles')
    .select('id')
    .eq('email',Passengeremail)
    .single()

    const PassengerId=pasid?.id;

    // The pool's ID comes from the URL parameter.
    const { poolId } = req.params;

        // All the complex logic is now handled in the service layer.
        // The controller's only job is to manage the request and response.
        const newRequest = await supabaseService.createPoolJoinRequestInDb(
            parseInt(poolId, 10),
            PassengerId
        );

        // If the service layer is successful, send one successful response.
        return res.status(201).json({ message: 'Request to join pool sent successfully.', request: newRequest });

    } catch (error: any) {
        // Handle specific error for duplicate requests (violates UNIQUE constraint)
        if (error.code === '23505') { // PostgreSQL unique violation error code
            return res.status(409).json({ message: 'You have already sent a request to join this pool.' });
        }
        
        // Handle other known errors that might be thrown from the service
        if (error.message.includes('Pool not found')) {
            return res.status(404).json({ message: 'The requested pool does not exist.' });
        }

        // Handle all other potential errors
        console.error('Error requesting to join pool:', error);
        return res.status(500).json({ message: 'An internal server error occurred.' });
    }
};



