import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, default: 'user' },
    onboarding_completed: { type: Boolean, default: false },
    goal: { type: String, default: 'learn' },
    balance: { type: Number, default: 0 },
    total_earnings: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    badges: { type: [String], default: ["onboarding"] },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);