import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import connectDb from './utils/db.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.route.js';
import messageRoutes from './routes/message.routes.js';
dotenv.config({})
const PORT = process.env.PORT || 3000;
const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true,
}
app.use(cors(corsOptions));
//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/message', messageRoutes);  


app.listen(PORT, () => {
    connectDb()
    console.log(`Server is running on port ${PORT}`);
});