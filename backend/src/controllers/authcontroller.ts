import { Request, Response } from 'express';
import {supabase} from '../client/supabase';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, 
};


export const register = async (req: Request, res: Response): Promise <void> => {
  const { username, password, email} = req.body;
  console.log('Registering user:');

  const { data: existingEmail } = await supabase
  .from('profiles')
  .select('id')
  .eq('username',username)
  .maybeSingle();

  if (existingEmail) {
  res.status(409).json({ message: 'User already registered' });
  return
  }

  const { data: signUpData, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !signUpData?.user?.id) {
    res.status(400).json({ message: error?.message });
    return
  }
  const userId = signUpData.user.id;

  const { error: insertError } = await supabase
  .from('profiles')
  .insert([
    {
      email: email,
      username:username,
    },
  ]);

  if (insertError) {
    console.error('Insert error:', insertError.message);
    res.status(500).json({ message: 'Insert Error. Check console ' });
    return
  }

  res.status(201).json({ message: 'User registered.' });
};


//login function

export const login = async (req: Request, res: Response):Promise <void> => {
  const { Email, password } = req.body;
  const isMobileApp = req.headers['x-client-type'] === 'Mobile';

  const email =Email;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('email', Email)
      .single();

    if (error || !data) {
      res.status(400).json({ message: 'Invalid username or user not found' });
      return;
    }


}
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError || !signInData.session) {
    res.status(401).json({ message: signInError?.message || 'Login failed' });
    return
  }

  const { access_token, refresh_token, user } = signInData.session;

  const { data: userRegData, error: userRegError } = await supabase
      .from('profiles')
      .select('username')
      .eq('email', Email)
      .single();

   if (userRegError || !userRegData) {
      res.status(400).json({ message: 'Invalid username or user not found' });
      return;
    }


  const { data: userDetails, error: fetchError } = await supabase
  .from('profiles')
  .select('username')
  .eq('email', email)
  .maybeSingle();

console.log(userDetails);
if (fetchError || !userDetails) {
  res.status(500).json({ message: 'Failed to fetch user profile details' });
  return;
}


  console.log("login", signInData.session.expires_in);
  if(isMobileApp){
    res.status(200).json({
      message : "Logged In",
      user: userDetails,
      accessToken:access_token,
      refreshToken:refresh_token,
      expiresIn: signInData.session.expires_in, 
    })
  } else{
    res.cookie('access_token', access_token, cookieOptions);
    res.cookie('refresh_token', refresh_token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30,
    });
    console.log("Logged in the user.");
    res.status(200).json({ message: 'Logged in', user: userDetails});
  }
};
