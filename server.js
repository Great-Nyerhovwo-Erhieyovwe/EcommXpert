import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv'
import auth from './routes/auth.js';

dotenv.config();

const app = express();
// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', auth);

// Root test route
app.get('/', (req, res) => {
  res.send("Backend is running...");
});

// MongoDB Connnection
(async () => {
  try {
    await
    mongoose.connect(process.env.MONGO_URL, {
        dbName: process.env.DB_NAME || "ecommxpertglobal_db_user",
      });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDb Error:", error);
    process.exit(1);
  }
})();

// ---------------------- SERVER START ----------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Backend running on ${PORT}`)
);
