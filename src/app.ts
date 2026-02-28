import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();

app.use(express.json());        
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);

export default app;