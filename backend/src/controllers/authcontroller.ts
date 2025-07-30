import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Simple in-memory user store for proof of concept
const users: Array<{id: string, email: string, username: string, password: string}> = [];

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, email } = req.body;
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email || u.username === username);
  if (existingUser) {
    res.status(409).json({ message: 'User already exists' });
    return;
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    email,
    username,
    password // In real app, hash this
  };
  
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // Generate token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '24h' }
  );

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username
    }
  });
};

// Debug endpoint to see registered users
export const debug = async (req: Request, res: Response): Promise<void> => {
  res.json({ 
    users: users.map(u => ({ id: u.id, email: u.email, username: u.username }))
  });
};