import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URI not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;