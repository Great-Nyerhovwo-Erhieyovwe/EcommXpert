import mongoose from 'mongoose';

const db = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL not defined in environment variables');
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

export default db;