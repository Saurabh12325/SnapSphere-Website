import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import connectDb from './utils/db.js';
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

app.listen(PORT, () => {
    connectDb()
    console.log(`Server is running on port ${PORT}`);
});