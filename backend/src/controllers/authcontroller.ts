import { Request, Response } from 'express';
import {supabase} from '../client/supabase';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, 
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, email } = req.body;
  console.log('Registering user:', { username, email });

  try {
    // Check if username already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .maybeSingle();

    if (existingUser) {
      res.status(409).json({ message: 'Username already taken' });
      return;
    }

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingEmail) {
      res.status(409).json({ message: 'Email already registered' });
      return;
    }

    // Create user in Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !signUpData?.user?.id) {
      console.error('Auth signup error:', signUpError);
      res.status(400).json({ message: signUpError?.message || 'Registration failed' });
      return;
    }

    console.log('User created in auth:', signUpData.user.id);

    // Try to insert profile, handle if it already exists
    const { error: insertError } = await supabase
      .from('profiles')
      .upsert([{
        id: signUpData.user.id,
        email: email,
        username: username,
      }], {
        onConflict: 'id'
      });

    if (insertError) {
      console.error('Profile upsert error:', insertError);
      res.status(500).json({ message: 'Failed to create user profile' });
      return;
    }

    console.log('Profile created successfully');
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log('Login attempt for:', email);

  try {
    // Sign in with Supabase Auth
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !signInData.session) {
      console.error('Login error:', signInError);
      res.status(401).json({ message: signInError?.message || 'Invalid credentials' });
      return;
    }

    const { access_token } = signInData.session;

    // Get user profile
    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('username, email')
      .eq('id', signInData.user.id)
      .single();

    if (profileError || !userProfile) {
      console.error('Profile fetch error:', profileError);
      res.status(500).json({ message: 'Failed to fetch user profile' });
      return;
    }

    console.log('Login successful for:', userProfile.username);

    res.status(200).json({
      message: 'Login successful',
      token: access_token,
      user: userProfile
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Debug endpoint
export const debug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');
    
    res.json({ profiles, error });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};