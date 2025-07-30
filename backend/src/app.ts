import express from 'express';
import { Request,Response } from 'express';
import cors from 'cors';

import authroutes from './routes/authroots';
import poolroutes from './routes/poolroots';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authroutes);
app.use('/api/user', poolroutes);


app.get('/', (req: Request, res: Response) => {
    res.send('PathPool Backend is running!');
});

export default app;