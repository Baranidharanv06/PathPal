import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export interface Authentication extends Request {
  user?: { userId: string; email?: string; };
  userEmail?: string;
}

export const authenticator = (req: Request, res: Response, next: NextFunction): void => {
  let token: string| undefined;

  const authHead = req.headers.authorization;
  if (authHead && authHead.startsWith('Bearer ')){
      token = authHead.split(' ')[1];
  }
  else if(req.cookies &&req.cookies.access_token){
      token = req.cookies.access_token;
  }
  
  if (!token) {
    res.status(401).json({ message: 'No Token found!' });
    return;
  }
  
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; email?: string };
    (req as Authentication).user = payload;
    (req as Authentication).userEmail = payload.email;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token. Enter again...' });
    return;
  }
};
