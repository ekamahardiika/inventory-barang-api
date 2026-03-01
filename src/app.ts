import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';

const app = express();

app.use(express.json());        
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);

export default app;