import mongoose from 'mongoose';
import { type } from 'os';

const oauthUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    provider: { type: String, required: true },
    onboarding_completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model('OAuthUser', oauthUserSchema);