import express from 'express';
import cors from 'cors';
import { setupTheDatabase } from './database/db.connection.js';
import authRouter from './routes/auth.route.js';

const app = express();

app.use(cors());
app.use(express.json());

setupTheDatabase();

app.use('/api/auth', authRouter);




app.listen(process.env.PORT, () => {
    console.log(`Successfully running on ${process.env.PORT}`);
});
