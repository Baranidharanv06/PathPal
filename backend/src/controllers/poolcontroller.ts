import { Request, Response } from "express"
import { supabase } from "../client/supabase";
import { Authentication} from "../middleware/authmiddlware";

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

if (typeof email !== 'string' || email.length > 0) {
  return res.status(402).json({message: 'invalid email.'})
}

console.log(email);

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
    // 1. Query the 'pools' table in your Supabase database.
    // We want to select all columns (*) from the table.
    // We also join with the 'profiles' table to get the driver's name.
    const { data, error } = await supabase
      .from('pools')
      .select(`
        *
      `)
      // 2. Filter the results to only include pools that are 'scheduled'.
      // This prevents completed or cancelled rides from showing up in the search.
      .eq('status', 'scheduled');

    // 3. Handle any errors that occur during the database query.
    if (error) {
      console.error('Error fetching pools:', error.message);
      // Throw the error to be caught by the catch block.
      throw error;
    }

    // 4. If the query is successful, send the data back to the client
    // with a 200 OK status. The data will be an array of pool objects.
    res.status(200).json(data);

  } catch (error) {
    // 5. If any error occurs in the try block, send a generic
    // 500 Internal Server Error response.
    res.status(500).json({ message: 'Error fetching available pools' });
  }
};
