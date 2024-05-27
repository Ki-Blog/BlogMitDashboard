import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/post.route.js';
import cookieParser from 'cookie-parser';


dotenv.config();




mongoose
.connect(process.env.MONGO)
.then(() => {
  console.log('connected to db');
}).catch((err) => {
  console.log(err);
});

const app = express()

app.use(express.json());
app.use(cookieParser());

app.listen(4002, () => {
  console.log('server running on port 4002!')
});



app.use("/api/post", postRoutes);


app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});
