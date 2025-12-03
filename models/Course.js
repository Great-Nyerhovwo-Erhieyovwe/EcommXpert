import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: { type: String, enum: ['beginner', 'intermediate', 'pro'], default: 'beginner' },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    instructor: String,
    modules: { type: Number, default: 0 },
    enrolled: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);