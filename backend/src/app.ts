import express from 'express';
import { Request,Response } from 'express';
import cors from 'cors';

import authroutes from './routes/authroutes';
import poolroutes from './routes/poolroutes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authroutes);
app.use('/api/user', poolroutes);


app.get('/', (req: Request, res: Response) => {
    res.send('PathPool Backend is running!');
});

export default app;