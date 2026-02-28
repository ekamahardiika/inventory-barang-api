import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes'

const app = express();

app.use(express.json());        
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

export default app;