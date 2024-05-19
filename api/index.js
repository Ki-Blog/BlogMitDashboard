import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


mongoose
.connect(process.env.MONGO).then(() => {console.log('connected to db');
}).catch((err) => {
  console.log(err);
});


const app = express()

app.use(express.json());

app.listen(4000, () => {
    console.log('server running on port 4000!')
  });

  

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message
    });
  });